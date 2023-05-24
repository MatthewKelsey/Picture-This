import React from "react";
import { useNavigate } from "react-router-dom";
import { out } from "../ApiClient";
import "./Navbar.css";

import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
function Navbar(props) {
  let navigate = useNavigate();
  const logout = () => {
    out();
    navigate("/");
  };
  const handleHome = async () => {
    navigate("/profile");
  };
  return (
    <div className="nav-bar">
      <div className="home" onClick={handleHome}>
        <HomeIcon></HomeIcon>
      </div>
      <div className="picture-this">
        <img src="../picturethis2.png" alt="logo"></img>
      </div>
      <div className="logout-icon" onClick={logout}>
        <LogoutIcon></LogoutIcon>
      </div>
    </div>
  );
}

export default Navbar;
