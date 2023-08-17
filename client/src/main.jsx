import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Login from "./layouts/Login.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import AppTheme from "./theme.jsx";
import Signup from "./layouts/Signup.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./layouts/Home.jsx";
import Search from "./layouts/Search.jsx";
import GroupRoom from "./layouts/GroupRoom.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={AppTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/groupRoom" element={<GroupRoom />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
console.log("reloaded");
