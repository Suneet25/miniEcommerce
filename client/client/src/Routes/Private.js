import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import axios from "axios";
import Spin from "../components/Spinner";

export default function PrivateRoute() {
  let [ok, setOk] = useState(false);
  let [auth, setAuth] = useAuth();

  useEffect(() => {
    let authCheck = async () => {
      let res = await axios.get(
        "https://magenta-rose-donkey-robe.cyclic.app/api/v1/auth/user-auth"
      );
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spin path="" />;
}
