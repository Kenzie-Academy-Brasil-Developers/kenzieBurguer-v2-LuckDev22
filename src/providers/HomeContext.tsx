import { createContext, useState } from 'react';
import { api } from '../services/api';
import { IDefaultProvidersProps } from './@types';

interface IProducts {
  id: number;
  name: string;
  category: string;
  price: number;
  img: URL;
}

interface IHomeContext {
  products: IProducts[];
  setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>;
  getProducts: () => Promise<void>;
  cartModal: boolean;
  setCartModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const HomeContext = createContext({} as IHomeContext);

export const HomeProvider = ({ children }: IDefaultProvidersProps) => {
  const [products, setProducts] = useState<IProducts[]>([]);

  const [cartModal, setCartModal] = useState(false)  

  const getProducts = async () => {
    const token = localStorage.getItem('@TOKEN');
    try {
      const response = await api.get('/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  

  return (
    <HomeContext.Provider value={{ products, setProducts, getProducts, cartModal, setCartModal }}>
      {children}
    </HomeContext.Provider>
  );
};
