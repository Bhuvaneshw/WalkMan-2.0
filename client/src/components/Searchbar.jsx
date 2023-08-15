import {Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import searchContext from "../searchContext";
import {searchSong} from "./util";

const SearchBar = () => {
    const navigate = useNavigate();
    const {searchQuery, setSearchQuery, setSearchRes} =
        useContext(searchContext);
    return (
        <InputGroup
            borderRadius="300px"
            style={{
                minWidth: "40%",
                background: "#FBFCFE",
            }}
            className='searchBar'
            colorScheme="primary"
        >
            <InputRightElement pointerEvents="none">
                <SearchIcon color="gray.300"/>
            </InputRightElement>
            <Input
                type="text"
                placeholder="Search songs"
                borderRadius="300px"
                focusBorderColor="#5F04A770 "
                onClick={() => navigate("/search")}
                onKeyDown={(e) => {
                    console.log("hi");
                    searchSong(e, searchQuery, setSearchRes);
                }}
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                }}
            />
        </InputGroup>
    );
};

export default SearchBar;
