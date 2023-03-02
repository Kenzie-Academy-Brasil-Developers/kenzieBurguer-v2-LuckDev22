import { MdSearch } from 'react-icons/md';
import { StyledSearchForm } from './style';
import { StyledButton } from '../../../styles/button';
import { useContext } from 'react';
import { HomeContext } from '../../../providers/HomeContext';

const SearchForm = () => {
  
  const { filterProduct, setFilterCard } = useContext(HomeContext);

  <StyledSearchForm>
    <input type='text' placeholder='Digitar pesquisa' />
    <StyledButton type='submit' $buttonSize='medium' $buttonStyle='green'>
      <MdSearch />
    </StyledButton>
  </StyledSearchForm>;
};

export default SearchForm;
