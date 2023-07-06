import React from "react";
import { useNavigate } from "react-router-dom";
import { out } from "../ApiClient";
import "./Navbar.css";
import { useDispatch , useSelector} from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import  Badge  from "@mui/material/Badge";
import MailIcon from '@mui/icons-material/Mail';
import { toggleInvites } from "../notificationSlice";
import { refreshUser } from "../ApiClient";
import { updateUser } from "../userSlice";


function Navbar(props) {
  let navigate = useNavigate();
  const dispatch = useDispatch()
  const currentUser = useSelector((state)=> state.currentUser)
  const logout = () => {
    out();
    navigate("/");
  };
  const handleHome = async () => {
    // const user = await refreshUser()
    // dispatch(updateUser(user))
    navigate("/profile");
  };
  const inviteHandle = () => {
    dispatch(toggleInvites())
    console.log('e')
  };

  return (
    <div className="nav-bar">
      <div className="home" onClick={handleHome}>
        <HomeIcon sx={{marginLeft:'10px'}}></HomeIcon>
      </div>
      <div className="picture-this">
        <img src="../picturethis2.png" alt="logo"></img>
      </div>
      <div className="logout-icon" >
     { Object.keys(currentUser).length ? <Badge badgeContent={currentUser.pendingInvite.length} color="secondary">
  <MailIcon color="white" onClick={inviteHandle} />
</Badge> : ''}
        <LogoutIcon sx={{marginLeft:'50px', marginRight:'10px'}} onClick={logout}></LogoutIcon>
      </div>

    
    </div>
  );
}

export default Navbar;
