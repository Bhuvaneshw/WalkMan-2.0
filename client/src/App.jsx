import "./style.css";
import Title from "./components/Title.jsx";
import HStack from "./components/HStack.jsx";
import Stack from "./components/Stack.jsx";
import Searchbar from "./components/Searchbar.jsx";
import Profile from "./components/Profile.jsx";
import SideBar from "./components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import searchContext from "./searchContext";
import React, { useEffect, useState } from "react";
import { getRouteName } from "./components/util.js";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Icon from "./components/Icon.jsx";
import Icons from "./components/Icons.js";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  useEffect(() => {
    console.log("mounted");
    return () => console.log("unmounted");
  }, []);
  return (
    <searchContext.Provider
      value={{
        searchQuery: searchQuery,
        setSearchQuery: setSearchQuery,
        searchRes: searchRes,
        setSearchRes: setSearchRes,
      }}
    >
      <HStack width="100%" height="100%">
        <Stack className="navpar">
          <SideBar />
        </Stack>
        <Stack width="83%" className="fill">
          <Header />
          <Outlet></Outlet>
        </Stack>
      </HStack>
    </searchContext.Provider>
  );
}

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const toast = useToast();

  return (
    <HStack height="70px" justifyContent="space-between" alignItems="center">
      <HStack alignItems="center" pad="0 20px 0 20px">
        <Icon
          onClick={onOpen}
          src="/menu.svg"
          size="30px"
          mar="10px"
          className="mobileOnly"
        />
        <Title>{getRouteName(useLocation())}</Title>
      </HStack>
      <Searchbar />
      <HStack alignItems="center" pad="0 20px 0 10px">
        <Icons.USER
          onClick={() =>
            toast({
              title: "Not implemented yet",
              status: "warning",
              duration: 2000,
              isClosable: true,
              position: "top-right",
            })
          }
          className="mobileOnly"
        />
        <Profile name="Bhuvanesh" className="desktopOnly" />
      </HStack>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>

          <DrawerBody>
            <SideBar width="100%" onClick={onClose} />
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme="blue">Logout</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
}

export default App;
