import React from "react";
import NewAlbum from "../NewAlbum/NewAlbum";
import AlbumItem from ".././AlbumItem/AlbumItem";
import Invites from "../InviteList/Invites";
import SharedAlbumItem from "../SharedAlbumItem/SharedAlbumItem";
import { ImageList } from "@mui/material";
import "./Profile.css";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddAlbumPopup } from "../../Store/notificationSlice";


function Profile(props) {
  const currentUser = useSelector((state) => state.currentUser);
  const invitePopup = useSelector((state) => state.notifications.albumInvite);
  const userAlbums = currentUser.uploadedAlbums;
  const sharedAlbums = currentUser.sharedAlbums;
  const albumPopup = useSelector((state) => state.notifications.addAlbumPopup);
  const dispatch = useDispatch();
  const addHandle = () => {
    dispatch(toggleAddAlbumPopup());
  };

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
              {Array.isArray(userAlbums) &&
                userAlbums.map((album) => (

                  <AlbumItem
                 album={album}
                  />
                ))}
            </ImageList>
          </div>
          <div>
            <h2>Shared albums</h2>
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
              {sharedAlbums.map((album) => (
                <SharedAlbumItem
                  key={album._id}
                  album={album}
               
                
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
          <NewAlbum userAlbums={userAlbums} />
        </div>
      ) : (
        ""
      )}
      {invitePopup ? (
        <Invites
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Profile;
