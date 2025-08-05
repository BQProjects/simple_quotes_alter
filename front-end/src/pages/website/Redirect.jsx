import React, { useContext } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DatabaseContext } from "../../context/DatabaseContext";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

const Redirect = () => {
  const location = useLocation();
  const { databaseUrl } = useContext(DatabaseContext);
  const { setUser } = useContext(UserContext);
  const naviagte = useNavigate();
  const getUserData = async (user_id) => {
    try {
      const res = await axios.get(`${databaseUrl}/api/auth/getUser`, {
        params: { user_id: user_id },
      });
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    } finally {
      naviagte("/home");
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userId = params.get("userId");
    getUserData(userId);
  }, []);
  return <div></div>;
};

export default Redirect;
