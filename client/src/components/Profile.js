import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { refreshUser } from "../ApiClient";
import NewAlbum from "./NewAlbum";
import AlbumItem from './AlbumItem'
import Invites from "./Invites";
import SharedAlbumItem from "./SharedAlbumItem";
import { ImageList, imageListClasses } from "@mui/material";
import { makeStyles } from "@mui/material";
function Profile(props) {
  const [currentUser, setCurrentUser] = useState();
  const [userAlbums, setUserAlbums] = useState(
    props.currentUser.uploadedAlbums
  );
  const [sharedAlbums, setSharedAlbums] = useState(
    props.currentUser.sharedAlbums
  );


  const [albumPopup, setAlbumPopup] = useState(false);
  const [pendingInvite, setPendingInvite] = useState([]);
  const [invitePopup, setInvitePopup] = useState(false);
  const navigate = useNavigate();

  const addHandle = () => {
    setAlbumPopup(!albumPopup);
  };
  const inviteHandle = () => {
    setInvitePopup(!invitePopup);
  };
  useEffect(() => {
    console.log('hello')
    refreshUser()
      .then((data) => props.setCurrentUser(data))
      .then(setUserAlbums(props.currentUser.uploadedAlbums))
      .then(setPendingInvite(props.currentUser.pendingInvite));
    console.log(props.currentUser)
    setCurrentUser(props.currentUser);
  }, []);

  return (
    <div>
      <br />
      <div className="profile">
        <div className="right-container">
          <div>
            <h2>My albums</h2>
          </div>
        <div style={{width:'100%'}}>
            <ImageList
         
              sx={{  "&::-webkit-scrollbar": {
                display: "none",
              },height: 200,width:'100%', overflowX: "scroll" , display: "flex", flexDirection:'row'}}
             cols={2.5}
             rowHeight={200}
            >
              {userAlbums && userAlbums.map((album) => (
                <AlbumItem
                  key={album._id}
                  album={album}
                  userAlbums={userAlbums}
                  setUserAlbums={setUserAlbums}
                  currentAlbum={props.currentAlbum}
                  setCurrentAlbum={props.setCurrentAlbum}
                />
              ))}
            </ImageList>
            </div>
          <div>
            <h2>Shared albums</h2>
          </div>
          <div className="albums">
            <ImageList
              sx={{ width: "100%", height: 200, overflowX: "auto" }}
              cols={4}
            >
              {sharedAlbums.map((album) => (
                <SharedAlbumItem
                  key={album._id}
                  album={album}
                  setUserAlbums={setUserAlbums}
                  sharedAlbums={sharedAlbums}
                  currentAlbum={props.currentAlbum}
                  setSharedAlbums={setSharedAlbums}
                  setCurrentAlbum={props.setCurrentAlbum}
                />
              ))}
            </ImageList>
          </div>
        </div>
      </div>
      <div className="add-photo" onClick={addHandle}>
        +
      </div>
      {props.currentUser && pendingInvite.length ? (
        <div className="invite-alert" onClick={inviteHandle}>
          <img src="../invite.png" alt="invite" />
        </div>
      ) : (
        ""
      )}
      {albumPopup ? (
        <div className="add-album">
          <NewAlbum
            setUserAlbums={setUserAlbums}
            userAlbums={userAlbums}
            setAlbumPopup={setAlbumPopup}
          />
        </div>
      ) : (
        ""
      )}
      {invitePopup ? (
        <Invites
          setInvitePopup={setInvitePopup}
          sharedAlbums={sharedAlbums}
          setSharedAlbums={setSharedAlbums}
          currentUser={props.currentUser}
          setPendingInvite={props.setPendingInvite}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Profile;
