import React from "react";
import ShareAlbum from "./ShareAlbum";
import { useState, useEffect } from "react";
import MainAlbum from "./MainAlbum";
import Uploader from "./Uploader";
import EnlargedPhoto from "./EnlargedPhoto";
// import { refreshUser } from "../ApiClient";
import Invites from "./Invites";
import { useDispatch, useSelector } from "react-redux";
import ShareIcon from '@mui/icons-material/Share';
function Main(props) {
    const invitePopup = useSelector((state) => state.notifications.albumInvite)
  const photos = useSelector((state) => state.currentAlbum.currentAlbum.photos);
  const currentAlbum = useSelector((state) => state.currentAlbum.currentAlbum)
  const [showUpload, setShowUpload] = useState(false);
  const [largePhoto, setLargePhoto] = useState("");
  const [largePhotoActive, setLargePhotoActive] = useState(false);
  const [sharePopup, setSharePopup] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0)
  const share = () => {
    setSharePopup(!sharePopup);
   
  };

  const sortByFavourites = async () => {
    let allPhotos = photos;
    allPhotos.sort((a, b) => {
      return b.likes - a.likes;
    });
  };

 
  return (
    <div className="main-container">
      
     <h1>{currentAlbum.albumName}</h1>  
      <div className="main-album">
       
        <MainAlbum
          photos={photos}
          currentIndex= {currentIndex}
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
          // setPhotos={setPhotos}
          currentAlbum={currentAlbum}
          // currentUser={currentUser}

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
      <div onClick={setShowUpload} className="add-photo">
        +
      </div>
      <div className="share" onClick={share}>
        <ShareIcon></ShareIcon>
      </div>
      {invitePopup ? (
        <Invites
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Main;
