import React, { useState, useEffect} from "react";
import { likePhoto, deletePhoto } from "../ApiClient";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./Photo.css";
import { ImageListItem, ImageListItemBar } from "@mui/material";
import Badge from "@mui/material/Badge";
import { useSelector , useDispatch} from "react-redux";
import { removePhoto } from "../currentAlbumSlice";
function Photo({
  photo
}) {
  
  const dispatch = useDispatch()
  const [like, setLike] = useState(true);
  const currentUser =  useSelector((state) => state.currentUser)
  const currentAlbum = useSelector((state) => state.currentAlbum.currentAlbum)
  const user = currentUser._id;
  const likedBy = photo.liked;
  const owner = currentAlbum.owner;
  const uploader = photo.uploader;
  const uploaderName = photo.uploaderName;

  function deleteHandle() {
    console.log(currentAlbum)
    deletePhoto(photo._id);
   
    const albumUpdate = 
  dispatch(removePhoto(photo._id))
  }

  function likeHandle() {
    likePhoto(photo._id);
    setLike(!like);
  }

  function largeHandle() {
    // setLargePhoto(photo.imgAddress);
    // setLargePhotoActive(true);
    console.log(currentAlbum)
    console.log('user', photo._id)
  }

  useEffect(() => {
    if (likedBy.indexOf(user) === -1) {
      setLike(false);
    }
  }, [likedBy, user]);

  return (
    <ImageListItem
      sx={{
        position: "relative",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        padding: "2px",
        borderRadius: "2px",
      }}
    >
      <img
        alt="hurro"
        src={`${photo.imgAddress}?w=248&fit=crop&auto=format`}
        srcSet={`${photo.imgAddress}?w=248&fit=crop&auto=format&dpr=2 2x`}
        onClick={largeHandle}
      />
      <ImageListItemBar
        position="below"
        title={uploaderName}
        actionIcon={
          <div>
            <Badge badgeContent={likedBy.length}>
              {like ? (
                <FavoriteIcon sx={{ color: "red" }} onClick={likeHandle} />
              ) : (
                <FavoriteBorderIcon
                  sx={{ color: "red" }}
                  onClick={likeHandle}
                />
              )}
            </Badge>
            <DeleteForeverIcon onClick={deleteHandle}/>
          </div>
        }
      />
    </ImageListItem>
  );
}

export default Photo;
