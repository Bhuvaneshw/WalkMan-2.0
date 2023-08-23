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
import VoiceSearch from "./components/VoiceSearch.jsx";

function Main() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/player" element={<Player />} />
          <Route path="/playlist" />
          <Route path="/topsongs" element={<TopSongs />} />
          <Route path="/artists" element={<Artist />} />
          <Route path="/genre" element={<Genre />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </AnimatePresence>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={AppTheme}>
      <Router>
        {/* <Main /> */}
        <VoiceSearch />
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
console.log("reloaded");
