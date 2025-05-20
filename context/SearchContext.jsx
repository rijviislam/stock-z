"use client";
import { createContext, useContext, useState } from "react";
const searchContext = createContext();
export default function SearchProvider({ children }) {
  const [searchItem, setSearchItem] = useState("");
  return (
    <searchContext.Provider value={{ searchItem, setSearchItem }}>
      {children}
    </searchContext.Provider>
  );
}
export const useSearch = () => useContext(searchContext);
