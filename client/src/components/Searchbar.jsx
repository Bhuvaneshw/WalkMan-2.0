import {Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons"

const SearchBar = () => {
    return (
        <InputGroup borderRadius='300px' style={{
            width: '40%',
            background: '#FBFCFE',
        }} colorScheme='primary'>
            <InputRightElement pointerEvents='none'>
                <SearchIcon color='gray.300'/>
            </InputRightElement>
            <Input type='tel' placeholder='Search songs' borderRadius='300px'
                   focusBorderColor='#5F04A770'/>
        </InputGroup>
    );
}

export default SearchBar;