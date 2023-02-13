import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { refreshUser } from "../ApiClient";
import NewAlbum from "./NewAlbum";
import AlbumItem from "./AlbumItem";
import Invites from "./Invites";
import SharedAlbumItem from "./SharedAlbumItem";

function Profile(props) {
  // const [currentUser, setCurrentUser] = useState();
  const [userAlbums, setUserAlbums] = useState(props.currentUser.uploadedAlbums);
  const [sharedAlbums, setSharedAlbums] = useState(props.currentUser.sharedAlbums);
  const [albumPopup, setAlbumPopup] = useState(false);
  // const [pendingInvite, setPendingInvite] = useState(
  //   props.currentUser.pendingInvite
  // );
  const [invitePopup, setInvitePopup] = useState(false);
  const navigate = useNavigate();

  const addHandle = () => {
    setAlbumPopup(!albumPopup);
  };
  const inviteHandle = () => {
    setInvitePopup(!invitePopup);
    
  };
//   useEffect(()=>{
//     console.log()
// setCurrentUser(props.currentUser)
// console.log(currentUser)
//   }, [props.currentUser])

  return (
    <div>
     
      <br></br>
      <div className="profile">
        <div className="right-container">
          <h2 className="username">
            Welcome back {props.currentUser.firstName}
          </h2>
          <div>
            <h2>My albums</h2>
          </div>
          <div className="albums">
            {userAlbums && userAlbums.map((album) => {
    return (
      <AlbumItem
        album={album}
        userAlbums={userAlbums}
        setUserAlbums={setUserAlbums}
        currentAlbum={props.currentAlbum}
        setCurrentAlbum={props.setCurrentAlbum}
      />
    );
  })}
          </div>
          <div>
            <h2>Shared albums</h2>
          </div>
          <div className="albums">
            {sharedAlbums&& sharedAlbums.map((album) => {
    return (
      <SharedAlbumItem
        album={album}
        setUserAlbums={setUserAlbums}
        sharedAlbums={sharedAlbums}
        currentAlbum={props.currentAlbum}
        setSharedAlbums={setSharedAlbums}
        setCurrentAlbum={props.setCurrentAlbum}
      />
    );
  })}
            </div>
        </div>
      </div>
      <div className="add-photo" onClick={addHandle}>
        +
      </div>
      {(props.currentUser && props.currentUser.pendingInvite.length) ? (
        <div className="invite-alert" onClick={inviteHandle}>
          <img src="../invite.png"></img>
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
