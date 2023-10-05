import React, { useState, useEffect } from "react";
import { likePhoto, deletePhoto } from "../../ApiClient";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import DownloadIcon from '@mui/icons-material/Download';
import "./Photo.css";
import { ImageListItem, ImageListItemBar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { removePhoto } from "../../Store/currentAlbumSlice";
import { Badge } from "@mui/material";

function Photo({
  photo,
  setLargePhotoActive,
  index,

  setCurrentIndex,
}) {
  const dispatch = useDispatch();
  const [like, setLike] = useState(true);
  const currentUser = useSelector((state) => state.currentUser);

  const user = currentUser._id;
  const likedBy = photo.liked;

  function deleteHandle() {
    deletePhoto({ id: photo._id, user: user });
    dispatch(removePhoto(photo._id));
  }

  function likeHandle() {
    likePhoto(photo._id);
    setLike(!like);
  }

  function largeHandle() {
    setCurrentIndex(index);
    setLargePhotoActive(true);
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
        // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        padding: "2px",
        borderRadius: "2px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <img
        alt="pic"
        src={`${photo.imgAddress}?w=248&fit=crop&auto=format`}
        srcSet={`${photo.imgAddress}?w=248&fit=crop&auto=format&dpr=2 2x`}
        onClick={largeHandle}
      />
      <ImageListItemBar
        sx={{ height: "28px" }}
        position="bottom"
        actionPosition="right"
        actionIcon={
          photo.uploader === user ? (
            <DeleteForeverIcon
              sx={{ color: "white", marginRight: "10px" }}
              onClick={deleteHandle}
            />
          ) : (
            ""
          )
        }
        subtitle={
          <>
            {like ? (
              <Badge>
                <FavoriteIcon sx={{ color: "white" }} onClick={likeHandle} />
              </Badge>
            ) : (
              <Badge>
                <FavoriteBorderIcon
                  sx={{ color: "white" }}
                  onClick={likeHandle}
                />
              </Badge>
            )}
            {likedBy.length ? likedBy.length : ""}
          </>
        }
      />
      <div className="photo-icons"></div>
      <div className="title-bar">
        <span>{photo.title}</span>
      </div>
    </ImageListItem>
  );
}

export default Photo;
