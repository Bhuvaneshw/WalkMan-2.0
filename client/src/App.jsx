import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/Searchbar";
import { Box } from "@chakra-ui/react";
import Banner from "./layouts/Banner";
function App() {
  const [data, setData] = useState("");
  return <>{
    <Box>
      <SearchBar></SearchBar>
      <Banner></Banner>
    </Box>

  }</>;
}

export default App;
