import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const userAutoLoad = async () => {
    const token = localStorage.getItem('@TOKEN');
    if (token) {
      try {
        const response = await api.get('/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        navigate('/dashboard');
      } catch (error) {
        console.log(error);
        localStorage.removeItem('@TOKEN');
        navigate('/');
      }
    }
  };

  useEffect(() => {
    userAutoLoad();
  }, []);

  const userRegister = async (formData: IUserRegisterFormValues) => {
    try {
      setLoading(true);
      const response = await api.post('/users', formData);
      setUser(response.data.user);
      localStorage.setItem('@TOKEN', response.data.accessToken);
      console.log(response);
      navigate('/');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const userLogin = async (formData: IUserLoginFormValues) => {
    try {
      setLoading(true);
      const response = await api.post('/login', formData);
      navigate('/dashboard');
      console.log(response);
      localStorage.setItem('@TOKEN', response.data.accessToken);
    } catch (error) {
      console.log(error);
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
