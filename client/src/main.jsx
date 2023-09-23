import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Login from "./layouts/Login.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import AppTheme from "./theme.jsx";
import Signup from "./layouts/Signup.jsx";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./layouts/Home.jsx";
import Search from "./layouts/Search.jsx";
import Player from "./layouts/Player.jsx";
import { AnimatePresence } from "framer-motion";
import TopSongs from "./layouts/TopSongs.jsx";
import Artist from "./layouts/Artist.jsx";
import Genre from "./layouts/Genre.jsx";
import SearchContextProvider from "./searchContext.jsx";
import GroupRoom from "./layouts/GroupRoom.jsx";
import GroupRoomHome from "./components/GroupRoomHome.jsx";
import GroupRoomPlayer from "./components/GroupRoomPlayer.jsx";
import GroupRoomSearch from "./components/GroupRoomSearch.jsx";
import Profile from "./layouts/Profile.jsx";
import LandingPage from "./layouts/LandingPage.jsx";
import Playlist from "./layouts/Playlist.jsx";

function Main() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <SearchContextProvider>
        <Routes location={location}>
          <Route path="/home" element={<App />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="player" element={<Player />} />
            <Route path="groupRoom" element={<GroupRoom />}>
              <Route index element={<GroupRoomHome />} />
              <Route path="player" element={<GroupRoomPlayer />} />
              <Route path="search" element={<GroupRoomSearch />} />
            </Route>
            <Route path="topsongs" element={<TopSongs />} />
            <Route path="artists" element={<Artist />} />
            <Route path="genre" element={<Genre />} />
            <Route path="profile" element={<Profile />} />
            <Route path="playlist" element={<Playlist />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </SearchContextProvider>
    </AnimatePresence>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={AppTheme}>
    <Router>
      <Main />
    </Router>
  </ChakraProvider>
);
console.log("reloaded");
