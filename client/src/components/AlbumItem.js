import React from "react";
import { getAlbum, deleteAlbum } from "../ApiClient";
import { useNavigate } from "react-router-dom";
function AlbumItem(props) {
  const navigate = useNavigate();
  const removeAlbum = async () => {
    
    deleteAlbum(props.album._id);
    let newAlbumCollection = props.userAlbums;

    const index = newAlbumCollection.findIndex((element) => {
      return element._id === props.album._id;
    });
    newAlbumCollection.splice(index, 1);
    props.setUserAlbums([...newAlbumCollection]);
   
  };
  const openAlbum = async () => {
    const currentAlbum = await getAlbum(props.album._id);
    props.setCurrentAlbum(currentAlbum);
    navigate("/main");
  };

  return (
    <div className="album-item">
      {props.album.photos[0] ? (
        <img
          onClick={openAlbum}
          alt="album"
          src={props.album.photos[0].imgAddress}
        ></img>
      ) : (
        <h1 onClick={openAlbum}>+</h1>
      )}
      <div className="bin">
        <img src="../bin.png" alt="bin" onClick={removeAlbum}></img>
      </div>
      {props.album.albumName && <p>{props.album.albumName}</p>}
    </div>
  );
}

export default AlbumItem;
