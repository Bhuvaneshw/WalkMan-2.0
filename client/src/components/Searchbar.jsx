import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import Icons from "./Icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect,useState} from "react";
import searchContext from "../searchContext";
import { searchSong } from "./util";
import HStack from "./HStack";
import Gap from "./Gap";


function search(e, searchQuery, setSearchRes) {
    // console.log("hi");
    searchSong(e, searchQuery, setSearchRes);
}

const SearchBar = () => {
    const[voiceSearch,setVoiceSearch]=useState(false);
    const navigate = useNavigate();
    const location = useLocation()
    const { searchQuery, setSearchQuery, setSearchRes } = useContext(searchContext);
    useEffect(() => {
        if (location.search.toString().includes('?q=')) {
            let query = location.search.substring(location.search.indexOf('?q=') + 3);
            search({ code: 'Enter' }, query, setSearchRes)
        }
    }, [])

    return (<HStack width={'40%'} alignItems={'center'}>
        <InputGroup
            borderRadius="300px"
            style={{
                flex: 1,
                background: "#FBFCFE",
            }}
            className="searchBar"
            colorScheme="primary"
        >
            <InputRightElement pointerEvents="none">
               
                    <Icons.SEARCH />
                
            </InputRightElement>

            <Input
                type="text"
                placeholder="Search songs"
                borderRadius="300px"
                focusBorderColor="#5F04A770 "
                onClick={() => navigate("/search")}
                onKeyDown={(e) => {
                    search(e, searchQuery, setSearchRes);
                }}
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                }}
            />
        </InputGroup>
        <Gap width={'10px'}/>
        {/* <Icons.MIC /> */}
        <button>voice search</button>
        {/* the above button is yet to be updated */}
    </HStack>

    );
};

export default SearchBar;
