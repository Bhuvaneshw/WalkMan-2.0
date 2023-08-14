import "./style.css";
import Title from "./components/Title.jsx";
import HStack from "./components/HStack.jsx";
import Stack from "./components/Stack.jsx";
import Searchbar from "./components/Searchbar.jsx";
import Profile from "./components/Profile.jsx";
import SideBar from "./components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import searchContext from "./searchContext";
import { useState } from "react";
import { getRouteName } from "./components/util.js";

function App() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchRes, setSearchRes] = useState([]);
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
                    <SideBar location={useLocation()}/>
                </Stack>
                <Stack width="83%" className="fill">
                    <Header/>
                    <Outlet></Outlet>
                </Stack>
            </HStack>
        </searchContext.Provider>
    );
}

function Header() {
  return (
    <HStack height="70px" justifyContent="space-between" alignItems="center">
      <Title mar="0 0 0 20px">{getRouteName(useLocation())}</Title>
      <Searchbar />
      <Profile name="Bhuvanesh" />
    </HStack>
  );
}

export default App;
