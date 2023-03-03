import { StyledShopPage } from './style';
import CartModal from '../../components/CartModal';
import Header from '../../components/Header';
import ProductList from '../../components/ProductList';
import { StyledContainer } from '../../styles/grid';
import { useContext } from 'react';
import { HomeContext } from '../../providers/HomeContext';
import { UserContext } from '../../providers/UserContext';

const ShopPage = () => {
  const { user, loading } = useContext(UserContext);

  const { cartModal } = useContext(HomeContext);

  
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
