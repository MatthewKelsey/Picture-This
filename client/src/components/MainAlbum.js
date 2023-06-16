import React, { useEffect } from "react";
import Photo from "./Photo";
import "./MainAlbum.css";
import { ImageList} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
function MainAlbum({setLargePhoto, setLargePhotoActive ,currentIndex,
  setCurrentIndex
}) {
const photos = useSelector((state)=> state.currentAlbum.currentAlbum.photos)

  return (
    <div>
      <ImageList
        variant="masonry"
       
        gap={20}
        sx={{ columnCount: { 
          xs: '2 !important',
          sm: '2 !important',
          md: '3 !important',
          lg: '4 !important',
          xl: '5 !important',
        }, width: "100%", overflowY: "auto" }}
      >
        {photos && photos.map((photo, index) => (
         
          <Photo
          currentIndex= {currentIndex}
          setCurrentIndex={setCurrentIndex}

            index={index}
            photo={photo}
            setLargePhoto={setLargePhoto}
            setLargePhotoActive={setLargePhotoActive}
          />
        ))}
      </ImageList>
    </div>
  );
}

export default MainAlbum;
