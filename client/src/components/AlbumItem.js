import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { deleteAlbum, getAlbum } from "../ApiClient";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

function AlbumItem({ album, userAlbums, setUserAlbums, setCurrentAlbum }) {
  const navigate = useNavigate();

  const removeAlbum = useCallback(async () => {
    await deleteAlbum(album._id);
    const newAlbumCollection = userAlbums.filter(
      (element) => element._id !== album._id
    );
    setUserAlbums(newAlbumCollection);
  }, [album._id, userAlbums, setUserAlbums]);

  const openAlbum = useCallback(async () => {
    const currentAlbum = await getAlbum(album._id);
    setCurrentAlbum(currentAlbum);
    navigate("/main");
  }, [album._id, setCurrentAlbum, navigate]);

  return (
    <ImageListItem
      key={album._id}
      
      sx={{
        gap:10,
        "&::-webkit-scrollbar": {
          display: "none",
        },
        margin:'5px',
        height: 200,
        minWidth: "300px",
        cursor: "pointer",
        borderRadius:'10px'
      }}
      onClick={openAlbum}
    >
      {album.photos[0] ? (
        <img alt="album" src={album.photos[0].imgAddress} loading="lazy"/>
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

AlbumItem.propTypes = {
  album: PropTypes.object.isRequired,
  userAlbums: PropTypes.array.isRequired,
  setUserAlbums: PropTypes.func.isRequired,
  setCurrentAlbum: PropTypes.func.isRequired,
};

export default AlbumItem;
