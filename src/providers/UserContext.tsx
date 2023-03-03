import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import {
  IUserContext,
  IDefaultProvidersProps,
  IUser,
  IUserRegisterFormValues,
  IUserLoginFormValues,
} from './@types';

export const UserContext = createContext({} as IUserContext);


export const UserProvider = ({ children }: IDefaultProvidersProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('@TOKEN');
    const id = localStorage.getItem('@IDUSER');
    const userAutoLoad = async () => {
      if (token) {
        try {
          setLoading(true);
          const response = await api.get(`/users/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
          navigate('/dashboard');
        } catch (error) {
          localStorage.removeItem('@TOKEN');
          navigate('/');
        } finally {
          setLoading(false);
        }
      }
    };

    userAutoLoad();
  }, []);

  const userRegister = async (formData: IUserRegisterFormValues) => {
    try {
      setLoading(true);
      const response = await api.post('/users', formData);
      setUser(response.data.user);
      localStorage.setItem('@TOKEN', response.data.accessToken);
      toast.success(`Usuario ${response.data.user.name}, cadastrado com sucesso!` );
      navigate('/');
    } catch (error) {
      toast.error('Usuario não cadastrado!');
    } finally {
      setLoading(false);
    }
  };

  const userLogin = async (formData: IUserLoginFormValues) => {
    try {
      setLoading(true);
      const response = await api.post('/login', formData);
      navigate('/dashboard');
      localStorage.setItem('@TOKEN', response.data.accessToken);
      localStorage.setItem('@IDUSER', response.data.user.id);
      setUser(response.data.user);
      toast.success(`${response.data.user.name}, Bem Vindo ! ` );
    } catch (error) {
      toast.error('Usuario ou senha invalido!');
    } finally {
      setLoading(false);
    }
  };

  const userLogout = () => {
    setUser(null);
    navigate('/');
    localStorage.removeItem('@TOKEN');
  };

  return (
    <UserContext.Provider
      value={{
        loading,
        setLoading,
        user,
        userRegister,
        userLogin,
        userLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
