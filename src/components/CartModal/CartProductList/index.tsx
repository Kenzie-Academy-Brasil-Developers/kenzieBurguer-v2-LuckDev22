import CartProductCard from './CartProductCard';

import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';
import { useContext } from 'react';
import { HomeContext } from '../../../providers/HomeContext';

const CartProductList = () => {
  const { fullValue, delAllCart } = useContext(HomeContext);

  return (
    <StyledCartProductList>
      <ul>
        <CartProductCard />
      </ul>

      <div className='totalBox'>
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className='total'>R$ {fullValue.toFixed(2)}</StyledParagraph>
      </div>
      <StyledButton
        $buttonSize='default'
        $buttonStyle='gray'
        onClick={() => delAllCart()}
      >
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  );
};

export default CartProductList;
