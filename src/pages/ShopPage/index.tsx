import { StyledShopPage } from './style';
import CartModal from '../../components/CartModal';
import Header from '../../components/Header';
import ProductList from '../../components/ProductList';
import { StyledContainer } from '../../styles/grid';
import { useContext } from 'react';
import { HomeContext } from '../../providers/HomeContext';


const ShopPage = () => {
  const { setCartModal, cartModal } = useContext(HomeContext);

  return (
  
    <StyledShopPage>
     {cartModal && <CartModal />} 
      <Header />
      <main>
        <StyledContainer containerWidth={1300}>
          <ProductList />
        </StyledContainer>
      </main>
    </StyledShopPage>
  
  )
}

export default ShopPage;
