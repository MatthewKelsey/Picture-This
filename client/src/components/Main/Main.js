import React from "react";
import ShareAlbum from "../ShareAlbum/ShareAlbum";
import { useState,} from "react";
import MainAlbum from "../MainAlbum/MainAlbum";
import Uploader from "../Uploader/Uploader";
import EnlargedPhoto from "../EnlargedPhoto/EnlargedPhoto";
import "./Main.css";
import Invites from "../InviteList/Invites";
import {  useSelector } from "react-redux";
import ShareIcon from "@mui/icons-material/Share";
function Main(props) {
  const invitePopup = useSelector((state) => state.notifications.albumInvite);
  const photos = useSelector((state) => state.currentAlbum.currentAlbum.photos) || [];
  const currentAlbum = useSelector((state) => state.currentAlbum.currentAlbum);
  const [showUpload, setShowUpload] = useState(false);
  const [largePhoto, setLargePhoto] = useState("");
  const [largePhotoActive, setLargePhotoActive] = useState(false);
  const [sharePopup, setSharePopup] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const share = () => {
    setSharePopup(!sharePopup);
  };


  return (
    <div className="main-container">
      <h1>{currentAlbum.albumName}</h1>
      <div className="main-album">
        <MainAlbum
          photos={photos}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setLargePhoto={setLargePhoto}
          setLargePhotoActive={setLargePhotoActive}
          currentAlbum={currentAlbum}
        />
      </div>
      {showUpload && (
        <Uploader
          setShowUpload={setShowUpload}
          photos={photos}
          currentAlbum={currentAlbum}
        />
      )}
      {sharePopup && (
        <div className="add-album">
          <ShareAlbum
            currentAlbum={currentAlbum}
            setSharePopup={setSharePopup}
          />
        </div>
      )}
      {largePhotoActive && (
        <EnlargedPhoto
          setLargePhotoActive={setLargePhotoActive}
          largePhoto={largePhoto}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      )}
      <div onClick={setShowUpload} className="add-photo" id="add">
        +
      </div>
      <div className="share" onClick={share}>
        <ShareIcon></ShareIcon>
      </div>
      {invitePopup ? <Invites /> : ""}
    </div>
  );
}

export default Main;
