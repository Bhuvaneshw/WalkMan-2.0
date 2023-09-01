import { createContext, useState } from "react";

export const searchContext = createContext();

export default function SearchContextProvider({ children }) {
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
      {children}
    </searchContext.Provider>
  );
}
