import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import { useContext } from 'react';
import { HomeContext } from '../../../providers/HomeContext';

const ProductCard = () => {
  const { products, addItenCart } = useContext(HomeContext);

  return (
    <>
      {products.map((card) => (
        <StyledProductCard key={card.id}>
          <div className='imageBox'>
            <img src={card.img} alt={card.name} />
          </div>
          <div className='content'>
            <StyledTitle tag='h3' $fontSize='three'>
              {card.name}
            </StyledTitle>
            <StyledParagraph className='category'>
              {card.category}
            </StyledParagraph>
            <StyledParagraph className='price'>{card.price}</StyledParagraph>
            <StyledButton
              onClick={() => addItenCart(card)}
              $buttonSize='medium'
              $buttonStyle='green'
            >
              Adicionar
            </StyledButton>
          </div>
        </StyledProductCard>
      ))}
    </>
  );
};

export default ProductCard;
