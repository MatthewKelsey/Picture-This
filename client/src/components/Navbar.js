import React from "react";
import { useNavigate } from "react-router-dom";
import { out, refreshUser } from "../ApiClient";

function Navbar(props) {
  let navigate = useNavigate();
  const logout = () => {
    out()
    navigate("/");
  };
  const handleHome = async () => {
   
    navigate("/profile");
  };
  return (
    <div className="nav-bar">
      <div className="home" onClick={handleHome}>
        <img src="../camera.png"></img>
      </div>
      <div className="picture-this">
        <img src="../picturethis2.png"></img>
      </div>

      <div className="logout-icon" onClick={logout}>
        <img src="../logout.png"></img>
      </div>
    </div>
  );
}

export default Navbar;
