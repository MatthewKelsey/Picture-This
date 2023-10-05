import React from "react";
import { removeSharedAlbum } from "../../ApiClient";
import { useNavigate } from "react-router-dom";
import { ImageListItem, ImageListItemBar } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSelector, useDispatch } from "react-redux";
import { updateSharedAlbum } from "../../Store/userSlice";
import { updateCurrentAlbum } from "../../Store/currentAlbumSlice";

function SharedAlbumItem({ album }) {
  const sharedAlbums = useSelector((state) => state.currentUser.sharedAlbums);
  const user = useSelector((state) => state.currentUser._id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeAlbum = async () => {
    await removeSharedAlbum({ albumId: album._id, user: user });
    const filteredAlbumList = sharedAlbums.filter((albumItem) => {
      return albumItem._id !== album._id;
    });
    dispatch(updateSharedAlbum(filteredAlbumList));
  };

  const openAlbum = async () => {
    dispatch(updateCurrentAlbum(album));
    navigate("/main-share");
  };

  return (
    <ImageListItem
      key={album._id}
      sx={{
        gap: 10,
        "&::-webkit-scrollbar": {
          display: "none",
        },
        margin: "5px",
        minWidth: {
          xs: "250px !important",
          sm: "300px !important",
          md: "350px !important",
        },
        maxWidth: "20%",
        cursor: "pointer",
        borderRadius: "10px",
        boxShadow: "1px 1px 2px 1px rgba(0, 0, 0, 0.3)",
        "@media (max-width: 768px)": {
          minWidth: "250px",
          maxWidth: "250px",
        },
      }}
      onClick={openAlbum}
    >
      {album.photos[0] ? (
        <img alt="album" src={album.photos[0].imgAddress} loading="lazy" />
      ) : (
        <h1>+</h1>
      )}
      <ImageListItemBar
        title={album.albumName}
        actionIcon={
          <DeleteForeverIcon
            onClick={removeAlbum}
            style={{ color: "#ffffff" }}
          />
        }
      />
    </ImageListItem>
  );
}

export default SharedAlbumItem;
