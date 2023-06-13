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
  const share = () => {
    setSharePopup(!sharePopup);
   
  };

  const sortByFavourites = async () => {
    let allPhotos = photos;
    allPhotos.sort((a, b) => {
      return b.likes - a.likes;
    });
  };

  // const upDatePhotos = (id) => {
  //   let upDatedPhotos = photos.filter((obj) => {
  //     return obj._id !== id;
  //   });
  //   setPhotos(upDatedPhotos);
  // };

  // useEffect(() => {
  //   sortByFavourites();

  // }, );


  return (
    <div className="main-container">
      
     <h1>{currentAlbum.albumName}</h1>  
      <div className="main-album">
       
        <MainAlbum
          photos={photos}
          // setPhotos={setPhotos}
          // upDatePhotos={upDatePhotos}
          setLargePhoto={setLargePhoto}
          setLargePhotoActive={setLargePhotoActive}
          // currentUser={currentUser}
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
