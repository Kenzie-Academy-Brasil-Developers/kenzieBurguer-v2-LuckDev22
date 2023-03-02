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
  setFilterCard: React.Dispatch<React.SetStateAction<string>>;
  addItenCart: (product: IProducts) => void;
  delItenCart: (itemId: number) => void;
  currentSale: IProducts[];
  fullValue: number;
  delAllCart: () => void;
}

export const HomeContext = createContext({} as IHomeContext);

export const HomeProvider = ({ children }: IDefaultProvidersProps) => {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [filterCard, setFilterCard] = useState('');
  const [currentSale, setCurrentSale] = useState<IProducts[]>([]);
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

  const addItenCart = (product: IProducts) => {
    if (!currentSale.some((productToCart) => productToCart.id === product.id)) {
      setCurrentSale([...currentSale, product]);
    } else {
      console.log('error');
    }
  };

  const delItenCart = (itemId: number) => {
    const newItem = currentSale.filter((item) => item.id !== itemId);
    setCurrentSale(newItem);
  };

      const fullValue = currentSale.reduce((valueInitial, newValue) => {
      return (newValue.price) + valueInitial;
    }, 0);


    const delAllCart = () => {
      if (currentSale.length > 0) {
        
        setCurrentSale([]);
      }
    };
  

  return (
    <HomeContext.Provider
      value={{
        products,
        setProducts,
        cartModal,
        setCartModal,
        filterProduct,
        setFilterCard,
        addItenCart,
        delItenCart,
        currentSale,
        fullValue,
        delAllCart
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
