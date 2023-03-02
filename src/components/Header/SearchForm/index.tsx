import { MdSearch } from 'react-icons/md';
import { StyledSearchForm } from './style';
import { StyledButton } from '../../../styles/button';
import { useContext } from 'react';
import { HomeContext } from '../../../providers/HomeContext';

const SearchForm = () => {
  const {filterCard, setFilterCard} = useContext(HomeContext);

  return (
    <StyledSearchForm>
      <input type='text' value={filterCard} placeholder='Digitar pesquisa' onChange={(event) => setFilterCard(event.target.value)}/>
      <StyledButton disabled type='submit' $buttonSize='medium' $buttonStyle='green'>
        <MdSearch />
      </StyledButton>
    </StyledSearchForm>
  );
};

export default SearchForm;
