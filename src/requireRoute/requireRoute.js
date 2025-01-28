import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { User } from "../components/context/userContext";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/loading/loading";
import Cookies from "universal-cookie";

export default function Type() {
  const cookies = new Cookies();
  const [type, setType] = useState("");
  const [token , setToken] = useState(cookies.get("Bearer"));
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setType(cookies.get("Type"));
    setToken(cookies.get("Bearer"))
    const showData = async () => {
      try {
        let res = await axios.get("http://localhost:5000/", {
          headers: {
            "x-auth-token": token,
          },
        });
        cookies.set("Type", res.data.type);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    showData();
  }, [token]);

  if (loading) {
    return <Loading />;
  }

  return !loading && token && type === "admin" ? <Outlet /> : <Navigate replace to="*" />;
}