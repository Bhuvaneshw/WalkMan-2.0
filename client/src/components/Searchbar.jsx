import {Box, Input, InputGroup, InputRightElement, List, ListItem, Text, useDisclosure,} from "@chakra-ui/react";
import Icons from "./Icons";
import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {searchContext} from "../searchContext";
import {searchAutoComplete, searchSong} from "./util";
import HStack from "./HStack";
import Gap from "./Gap";
import Icon from "./Icon";
import VoiceSearch from "./VoiceSearch";

function search(e, searchQuery, setSearchRes) {
    // console.log("hi");
    searchSong(e, searchQuery, setSearchRes);
}

const SearchBar = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [autoCompleteRes, setAutoCompleteRes] = useState([]);
    const [showAutoComplete, setShowAutoComplete] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const {searchQuery, setSearchQuery, setSearchRes} =
        useContext(searchContext);
    useEffect(() => {
        if (location.search.toString().includes("?q=")) {
            let query = location.search.substring(location.search.indexOf("?q=") + 3);
            console.log('manual log', query)
            search({code: "Enter"}, query, setSearchRes);
        }
    }, [location.search]);

    return (
        <HStack flex={'1'} style={{maxWidth: '450px'}} alignItems={"center"}>
            <Box h={35} display={"flex"} flexDirection={"column"} flexGrow={1}>
                <InputGroup
                    borderRadius="300px"
                    style={{
                        flex: 1,
                        background: "#FBFCFE",
                        zIndex: 2,
                    }}
                    className="searchBar"
                    colorScheme="primary"
                >
                    <InputRightElement pointerEvents="none">
                        <Icons.SEARCH/>
                    </InputRightElement>
                    <Input
                        type="text"
                        placeholder="Search songs"
                        autoFocus
                        borderRadius="300px"
                        focusBorderColor="#5F04A770 "
                        onClick={() => {
                            console.log(location.pathname);
                            if (location.pathname.split("/")[2] !== "groupRoom") {
                                navigate("/home/search");
                            } else if (location.pathname.split("/")[3] === "player") {
                                navigate("/home/groupRoom/search");
                            }
                            setShowAutoComplete((prev) => !prev);
                        }}
                        onKeyDown={(e) => {
                            search(e, searchQuery, setSearchRes);
                        }}
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            searchAutoComplete(e.target.value, setAutoCompleteRes);
                        }}
                    />
                </InputGroup>
                <List
                    backgroundColor={"white"}
                    transform={"translate(0px,-20px)"}
                    borderBottomRadius={"30px"}
                    display={showAutoComplete ? "block" : "none"}
                >
                    <Gap height={"20px"}/>
                    {autoCompleteRes.map(({field, value, icon}, index) => {
                        // console.log(index);
                        return (
                            <ListItem key={index} gap={"10px"} _hover={{cursor: "pointer"}}>
                                <Box
                                    display={"flex"}
                                    p={"10px"}
                                    alignItems={"center"}
                                    gap={3}
                                    onClick={() => {
                                        setShowAutoComplete(false);
                                        setSearchQuery(value);
                                        search({code: "Enter"}, value, setSearchRes);
                                    }}
                                >
                                    <Icon
                                        src={"http://localhost:3000/assets" + icon}
                                        radius="25px"
                                        width={"50px"}
                                        height="50px"
                                        fit="cover"
                                    />
                                    <Text>{field.substring(0, 1).toUpperCase()+field.substring(1)}:</Text>
                                    <Text>{value}</Text>
                                </Box>
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
            <Gap width={"10px"}/>
            <div>
                <Icons.MIC size={'20px'} style={{cursor: 'pointer'}} onClick={() => {
                    onOpen();
                }}/>
            </div>
            <VoiceSearch
                isOpen={isOpen}
                onClose={onClose}
                setSearchQuery={setSearchQuery}
            ></VoiceSearch>
        </HStack>
    );
};

export default SearchBar;
