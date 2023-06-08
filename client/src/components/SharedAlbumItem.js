import React from "react";
import { getAlbum, removeSharedAlbum } from "../ApiClient";
import { useNavigate } from "react-router-dom";
import { ImageListItem , ImageListItemBar} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function SharedAlbumItem({album, sharedAlbums, setSharedAlbums, setCurrentAlbum}) {
  const navigate = useNavigate();
  const removeAlbum = async () => {
   
    removeSharedAlbum(album._id);
    let newAlbumCollection = sharedAlbums;
    const index = newAlbumCollection.findIndex((element) => {
      return element._id === album._id;
    });
    newAlbumCollection.splice(index, 1);
    setSharedAlbums([...newAlbumCollection]);
  
  };


  const openAlbum = async () => {
    const currentAlbum = await getAlbum(album._id);
    setCurrentAlbum(currentAlbum);
    navigate("/main-share");
  };

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

export default SharedAlbumItem;
