import { MdDelete } from 'react-icons/md';
import { StyledCartProductCard } from './style';
import { StyledTitle } from '../../../../styles/typography';
import { useContext } from 'react';
import { HomeContext } from '../../../../providers/HomeContext';

const CartProductCard = () => {
  const { currentSale, delItenCart } = useContext(HomeContext);

  return (
    <>
      {currentSale.map((itemCart) => (
        <StyledCartProductCard key={itemCart.id}>
          <div className='imageBox' >
            <img src={itemCart.img} alt={itemCart.name} />
          </div>
          <div className='contentBox'>
            <StyledTitle tag='h3' $fontSize='three'>
              {itemCart.name}
            </StyledTitle>
            <button type='button' aria-label='Remover' onClick={()=> delItenCart(itemCart.id)}>
              <MdDelete size={24} />
            </button>
          </div>
        </StyledCartProductCard>
      ))}
    </>
  );
};

export default CartProductCard;
