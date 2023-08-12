import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Login from "./layouts/Login.jsx";
import {ChakraProvider} from "@chakra-ui/react";
import AppTheme from "./theme.jsx";
import Signup from "./layouts/Signup.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ChakraProvider theme={AppTheme}>
            <App/>
            {/*<Login></Login>
            <Signup></Signup>*/}
        </ChakraProvider>
    </React.StrictMode>
);
