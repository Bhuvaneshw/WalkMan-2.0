import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import searchContext from "../searchContext";
const SearchBar = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useContext(searchContext);
  return (
    <InputGroup
      borderRadius="300px"
      style={{
        width: "40%",
        background: "#FBFCFE",
      }}
      colorScheme="primary"
    >
      <InputRightElement pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputRightElement>
      <Input
        type="tel"
        placeholder="Search songs"
        borderRadius="300px"
        focusBorderColor="#5F04A770 "
        onClick={() => navigate("/search")}
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
    </InputGroup>
  );
};

export default SearchBar;
