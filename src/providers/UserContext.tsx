import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export const UserContext = createContext({});

interface IDefaultProvidersProps {
  children: React.ReactNode;
}

interface IUser {
  id: number;
  name: string;
  email: string;
}

interface IUserRegisterFormValues {
  email: string;
  password: string;
  name: string;
}

interface IUserLoginFormValues {
  email: string;
  password: string;
}

interface IUserContext {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser | null;
  userRegister: (formData: IUserRegisterFormValues) => Promise<void>;
  userLogin: (formData: IUserLoginFormValues) => Promise<void>;
  userLogout: () => void;
}

export const UserProvider = ({ children }: IDefaultProvidersProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userAutoLoad = async () => {
      const token = localStorage.getItem('@TOKEN');
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
      console.log(response);
      navigate('/login');
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
