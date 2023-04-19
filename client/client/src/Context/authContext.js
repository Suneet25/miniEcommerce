import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
let AuthContext = createContext();

let AuthProvider = ({ children }) => {
  let [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  //defaults axios
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("auth"));
    if (data) {
      setAuth({ ...auth, user: data.user, token: data.token });
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

//customHooks

let useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
