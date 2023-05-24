import React from "react";
import Photo from "./Photo";
import { ImageList, ImageListItem } from "@mui/material";

function MainAlbum(props) {
  return (
    <ImageList variant="masonry" cols={4} gap={5}
    sx={{ width:'100%', overflowY:'auto'}}>
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
  );
}

export default MainAlbum;
