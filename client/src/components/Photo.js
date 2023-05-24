import React, { useState, useEffect } from "react";
import { likePhoto, deletePhoto } from "../ApiClient";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './Photo.css';
import { ImageListItem } from "@mui/material";

function Photo(props) {
  const [like, setLike] = useState(true);
  const user = props.currentUser._id;
  const likedBy = props.photo.liked;
  const owner = props.currentAlbum.owner;
  const uploader = props.photo.uploader;

  function deleteHandle() {
    deletePhoto(props.photo._id);
    props.upDatePhotos(props.photo._id);
  }

  function likeHandle() {
    likePhoto(props.photo._id);
    setLike(!like);
  }

  function largeHandle() {
    props.setLargePhoto(props.photo.imgAddress);
    props.setLargePhotoActive(true);
  }

  useEffect(() => {
    if (likedBy.indexOf(user) === -1) {
      setLike(false);
    }
  }, []);

  return (
    <ImageListItem sx={{position:'relative'}}
    >
      <img
        alt="hurro"
        src={`${props.photo.imgAddress}?w=248&fit=crop&auto=format`}
        srcSet={`${props.photo.imgAddress}?w=248&fit=crop&auto=format&dpr=2 2x`}
        onClick={largeHandle}
      />
      {(user === owner || user === uploader) && (
        <div className="bin" onClick={deleteHandle}>
          <DeleteForeverIcon />
        </div>
      )}
     
      <div className="favorite-icon" onClick={likeHandle}>
        {like ? (
          <FavoriteIcon sx={{ color: 'red' }} />
        ) : (
          <FavoriteBorderIcon sx={{ color: 'red' }} />
        )}
      </div>
      </ImageListItem>
  );
}

export default Photo;
