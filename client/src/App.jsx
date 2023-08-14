import "./style.css";
import Title from "./components/Title.jsx";
import HStack from "./components/HStack.jsx";
import Stack from "./components/Stack.jsx";

import Searchbar from "./components/Searchbar.jsx";
import Profile from "./components/Profile.jsx";

import SideBar from "./components/Sidebar";
import Home from "./layouts/Home";
import { Outlet } from "react-router-dom";

function App() {
  function Header() {
    return (
      <HStack height="70px" justifyContent="space-between" alignItems="center">
        <Title mar="0 0 0 20px">Home</Title>
        <Searchbar />
        <Profile name="Bhuvanesh" />
      </HStack>
    );
  }

  return (
    <HStack width="100%" height="100%">
      <Stack className="navpar" width='17%'>
        <SideBar />
      </Stack>
      <Stack width="83%" className="fill">
        <Header />
        <Outlet></Outlet>
      </Stack>
    </HStack>
  );
}

export default App;
