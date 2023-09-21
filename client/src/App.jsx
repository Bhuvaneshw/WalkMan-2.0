import "./style.css";
import Title from "./components/Title.jsx";
import HStack from "./components/HStack.jsx";
import Stack from "./components/Stack.jsx";
import Searchbar from "./components/Searchbar.jsx";
import Profile from "./components/Profile.jsx";
import SideBar from "./components/Sidebar";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import React from "react";
import {getRouteName} from "./components/util.js";
import {Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, useDisclosure,} from "@chakra-ui/react";
import Icon from "./components/Icon.jsx";
import Icons from "./components/Icons.js";

function App() {
    return (
        <HStack width="100%" height="100%">
            <Stack className="navpar">
                <SideBar/>
            </Stack>
            <Stack width="83%" className="fill">
                <Header/>
                <Outlet></Outlet>
            </Stack>
        </HStack>
    );
}

function Header() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const btnRef = React.useRef();
    const navigate = useNavigate();

    return (
        <HStack height="70px" justifyContent="space-between" alignItems="center" style={{position: 'sticky', top: '0', zIndex:'100', background:'#EEF2FD'}}>
            <HStack alignItems="center" pad="0 0 0 20px">
                <Icon
                    onClick={onOpen}
                    src="/menu.svg"
                    size="30px"
                    mar="10px"
                    className="mobileOnly"
                />
                <Title className={'desktopOnly'}>{getRouteName(useLocation())}</Title>
            </HStack>
            <Searchbar/>
            <HStack alignItems="center" pad="0 20px 0 10px">
                <Icons.USER
                    onClick={() => navigate('/home/profile')}
                    className="mobileOnly"
                />
                <Profile name="Bhuvanesh" className="desktopOnly" onClick={() => navigate('/home/profile')}/>
            </HStack>
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}>
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerBody>
                        <SideBar width="100%" onClick={onClose}/>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </HStack>
    );
}

export default App;
