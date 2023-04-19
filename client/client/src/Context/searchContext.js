import { createContext, useContext, useState } from "react";

let SearchContext = createContext();

let SearchProvider = ({ children }) => {
  let [auth, setAuth] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};

//customHooks

let useSearch = () => useContext(SearchContext);

export { SearchProvider, useSearch };
