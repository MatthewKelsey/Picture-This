import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NewAlbum from "./NewAlbum";
import AlbumItem from "./AlbumItem";
import Invites from "./Invites";
import SharedAlbumItem from "./SharedAlbumItem";
import { ImageList } from "@mui/material";
import "./Profile.css";
import { useSelector, useDispatch } from "react-redux";
import { toggleInvites } from "../notificationSlice";


function Profile(props) {
  const currentUser = useSelector((state) => state.currentUser);
  const invitePopup = useSelector((state) => state.notifications.albumInvite)
  const userAlbums = currentUser.uploadedAlbums;
  const sharedAlbums = currentUser.sharedAlbums;
  const dispatch = useDispatch()
  const [albumPopup, setAlbumPopup] = useState(false);
  const [pendingInvite, setPendingInvite] = useState([]);
  // const [invitePopup, setInvitePopup] = useState(false);
  const navigate = useNavigate();

  const addHandle = () => {
    setAlbumPopup(!albumPopup);
  };
  const inviteHandle = () => {
    console.log('invite handle')
    dispatch(toggleInvites())
    // setInvitePopup(!invitePopup);
  };
  // useEffect(() => {
  //   refreshUser()
  //     .then((data) => props.setCurrentUser(data))
  //     .then(setUserAlbums(props.currentUser.uploadedAlbums))
  //     .then(setPendingInvite(props.currentUser.pendingInvite));

  //   setCurrentUser(props.currentUser);
  // }, []);

  return (
    <div>
      <div className="profile">
        <div className="right-container">
          <div>
            <h2>My albums</h2>
          </div>
          <div className="albums">
            <ImageList
              sx={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                height: "100%",
                width: "100%",
                overflowX: "scroll",
                display: "flex",
                flexDirection: "row",
              }}
              cols={2.5}
            >
              {userAlbums &&
                userAlbums.map((album) => (
                  <AlbumItem
                    key={album._id}
                    album={album}
                    userAlbums={userAlbums}
                    // setUserAlbums={setUserAlbums}
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
                  // setUserAlbums={setUserAlbums}
                  sharedAlbums={sharedAlbums}
                  currentAlbum={props.currentAlbum}
                  // setSharedAlbums={setSharedAlbums}
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
    
      {albumPopup ? (
        <div className="add-album">
          <NewAlbum
            // setUserAlbums={setUserAlbums}
            userAlbums={userAlbums}
            setAlbumPopup={setAlbumPopup}
          />
        </div>
      ) : (
        ""
      )}
      {invitePopup ? (
        <Invites
          // setInvitePopup={setInvitePopup}
          sharedAlbums={sharedAlbums}
          // setSharedAlbums={setSharedAlbums}
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
