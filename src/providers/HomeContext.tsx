import { createContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { IDefaultProvidersProps } from './@types';

interface IProducts {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

interface IHomeContext {
  products: IProducts[];
  setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>;
  cartModal: boolean;
  setCartModal: React.Dispatch<React.SetStateAction<boolean>>;
  filterProduct: IProducts[];
}

export const HomeContext = createContext({} as IHomeContext);

export const HomeProvider = ({ children }: IDefaultProvidersProps) => {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [filterCard, setFilterCard] = useState('');
  const [currentSale, setCurrentSale] = useState();
  const [cartModal, setCartModal] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      const token = localStorage.getItem('@TOKEN');
      try {
        const response = await api.get('/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const filterProduct = products.filter(
    (product) =>
      product.name.toLowerCase().startsWith(filterCard) ||
      product.category.toLowerCase().startsWith(filterCard)
  );

  // const addItenCart = (product) => {
  //   if (!currentSale.some((productToCart) => productToCart.id === product.id)) {
  //     setCurrentSale([...currentSale, product]);
  //   } else {
  //     console.log("error")
  //   }
  // };

  // const delItenCart = (itemId) => {
  //   const newItem = currentSale.filter((item) => item.id !== itemId);
  //   setCurrentSale(newItem);
  // };

  return (
    <HomeContext.Provider
      value={{ products, setProducts, cartModal, setCartModal, filterProduct }}
    >
      {children}
    </HomeContext.Provider>
  );
};
