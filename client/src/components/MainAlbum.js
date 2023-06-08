import React, { useEffect } from "react";
import Photo from "./Photo";
import "./MainAlbum.css";
import { ImageList} from "@mui/material";

function MainAlbum(props) {

  return (
    <div>
      <ImageList
        variant="masonry"
        cols={4}
        gap={20}
        sx={{ width: "100%", overflowY: "auto" }}
      >
        {props.photos.map((photo) => (
          <Photo
            currentAlbum={props.currentAlbum}
            upDatePhotos={props.upDatePhotos}
            key={photo._id}
            photo={photo}
            setLargePhoto={props.setLargePhoto}
            setLargePhotoActive={props.setLargePhotoActive}
            currentUser={props.currentUser}
          />
        ))}
      </ImageList>
    </div>
  );
}

export default MainAlbum;
