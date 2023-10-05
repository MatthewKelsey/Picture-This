import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAlbum } from "../../ApiClient";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { updateUploadedAlbums } from "../../Store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { updateCurrentAlbum } from "../../Store/currentAlbumSlice";

function AlbumItem({ album }) {
  const userAlbums = useSelector((state) => state.currentUser.uploadedAlbums);
  const currentUser = useSelector((state)=> state.currentUser._id)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeAlbum = useCallback(async () => {
    await deleteAlbum({albumId : album._id, user: currentUser});
    const newAlbumCollection = userAlbums.filter(
      (element) => element._id !== album._id
    );
    dispatch(updateUploadedAlbums(newAlbumCollection));
  }, [album._id, userAlbums, dispatch, currentUser]);

  const openAlbum = useCallback(async () => {
    dispatch(updateCurrentAlbum(album));
    navigate("/main");
  }, [album, navigate, dispatch]);

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
    >
      {album.photos[0] ? (
        <img
          alt="album"
          src={album.photos[0].imgAddress}
          loading="lazy"
          onClick={openAlbum}
        />
      ) : (
        <h1 onClick={openAlbum}>+</h1>
      )}
      <ImageListItemBar
        title={album.albumName}
        actionIcon={
          <DeleteForeverIcon
            onClick={removeAlbum}
            style={{ color: "#ffffff", zIndex: 10 }}
          />
        }
      />
    </ImageListItem>
  );
}

export default AlbumItem;
