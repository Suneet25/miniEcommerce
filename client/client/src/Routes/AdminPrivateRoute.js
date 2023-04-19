import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import axios from "axios";
import Spin from "../components/Spinner";

export default function AdminPrivateRoute() {
  let [ok, setOk] = useState(false);
  let [auth, setAuth] = useAuth();

  useEffect(() => {
    let authCheck = async () => {
      let res = await axios.get("http://localhost:8080/api/v1/auth/admin-auth");
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
