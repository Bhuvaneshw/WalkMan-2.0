import { Input,InputGroup,InputLeftElement} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons"

const SearchBar = () => {
    return ( 
        <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <SearchIcon color='gray.300' />
        </InputLeftElement>
        <Input type='tel' placeholder='Search songs' />
      </InputGroup>
     );
}
 
export default SearchBar;