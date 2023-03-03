import { StyledShopPage } from './style';
import CartModal from '../../components/CartModal';
import Header from '../../components/Header';
import ProductList from '../../components/ProductList';
import { StyledContainer } from '../../styles/grid';
import { useContext, useEffect } from 'react';
import { HomeContext } from '../../providers/HomeContext';
import { UserContext } from '../../providers/UserContext';
import { api } from '../../services/api';

const ShopPage = () => {
  const { user, loading, setLoading } = useContext(UserContext);
  const { cartModal, setProducts } = useContext(HomeContext);

  useEffect(() => {
    const token = localStorage.getItem('@TOKEN');
    if (token) {
      const getProducts = async () => {
        try {
          setLoading(true);
          const response = await api.get('/products', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProducts(response.data);
        } catch (error) {
        } finally {
          setLoading(false);
        }
      };
      getProducts();
    }
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      {user ? (
        <StyledShopPage>
          {cartModal && <CartModal />}
          <Header />
          <main>
            <StyledContainer containerWidth={1300}>
              <ProductList />
            </StyledContainer>
          </main>
        </StyledShopPage>
      ) : null}
    </>
  );
};

export default ShopPage;
