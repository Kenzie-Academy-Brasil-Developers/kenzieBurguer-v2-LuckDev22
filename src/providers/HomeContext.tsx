import { createContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { IDefaultProvidersProps, IHomeContext, IProducts } from './@types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const HomeContext = createContext({} as IHomeContext);

export const HomeProvider = ({ children }: IDefaultProvidersProps) => {
  const localItenCart = localStorage.getItem('@ItemCart');
  const [products, setProducts] = useState<IProducts[]>([]);
  const [filterCard, setFilterCard] = useState('');
  const [cartModal, setCartModal] = useState(false);
  const [currentSale, setCurrentSale] = useState<IProducts[]>(
    localItenCart ? JSON.parse(localItenCart) : []
  );

  useEffect(() => {
    const token = localStorage.getItem('@TOKEN');
    const getProducts = async () => {
      try {
        const response = await api.get('/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (error) {}
    };
    getProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('@ItemCart', JSON.stringify(currentSale));
  }, [currentSale]);

  const filterProduct = products.filter(
    (product) =>
      product.name.toLowerCase().startsWith(filterCard) ||
      product.category.toLowerCase().startsWith(filterCard)
  );

  const addItenCart = (product: IProducts) => {
    if (!currentSale.some((productToCart) => productToCart.id === product.id)) {
      setCurrentSale([...currentSale, product]);
      toast.success('Produto adicionado com sucesso!');
    } else {
      toast.error('Produto já adicionado!');
    }
  };

  const delItenCart = (itemId: number) => {
    const newItem = currentSale.filter((item) => item.id !== itemId);
    setCurrentSale(newItem);
    toast.warn('Produto removido!');
  };

  const fullValue = currentSale.reduce((valueInitial, newValue) => {
    return newValue.price + valueInitial;
  }, 0);

  const delAllCart = () => {
    if (currentSale.length > 0) {
      toast.warn('Todos os produto removido!');
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
        delAllCart,
        filterCard,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
