import React from "react";
import ShareAlbum from "./ShareAlbum";
import { useState } from "react";
import MainAlbum from "./MainAlbum";
import Uploader from "./Uploader";
import EnlargedPhoto from "./EnlargedPhoto";
import "./Main.css";
import Invites from "./Invites";
import { useSelector } from "react-redux";

function MainShare(props) {
  const invitePopup = useSelector((state) => state.notifications.albumInvite);
  const photos = useSelector((state) => state.currentAlbum.currentAlbum.photos);
  const currentAlbum = useSelector((state) => state.currentAlbum.currentAlbum);
  const [showUpload, setShowUpload] = useState(false);
  const [largePhoto, setLargePhoto] = useState("");
  const [largePhotoActive, setLargePhotoActive] = useState(false);
  const [sharePopup, setSharePopup] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="main-container">
      <div> </div>
      <br></br>

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
            currentAlbum={props.currentAlbum}
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
      <div onClick={setShowUpload} className="add-photo">
        +
      </div>
      {invitePopup ? <Invites /> : ""}
    </div>
  );
}
export default MainShare;
