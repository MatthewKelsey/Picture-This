import React from "react";
import PropTypes from "prop-types";
import "./EnlargedPhoto.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";


import { useSelector } from "react-redux";
function EnlargedPhoto({ setLargePhotoActive, currentIndex, setCurrentIndex }) {
  const close = () => setLargePhotoActive(false);
  const currentAlbum = useSelector(
    (state) => state.currentAlbum.currentAlbum.photos
  );
  const largePhoto = currentAlbum[currentIndex].imgAddress;

  function scrollForward() {
    if (currentIndex === currentAlbum.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function scrollBack() {
    if (currentIndex === 0) {
      setCurrentIndex(currentAlbum.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  }

  return (
    <div className="enlarged-photo">
      <ArrowBackIosNewIcon
        sx={{
          color: "white",
          margin: "10px",
          cursor: "pointer",
          position: "absolute",
          left: "0px",
        }}
        onClick={scrollBack}
      ></ArrowBackIosNewIcon>
      {currentAlbum && <img src={largePhoto} alt="Big" />}
      <ArrowForwardIosIcon
        sx={{
          color: "white",
          margin: "10px",
          cursor: "pointer",
          position: "absolute",
          right: "0px",
        }}
        onClick={scrollForward}
      ></ArrowForwardIosIcon>
      <div className="close" onClick={close}>
        <p>X</p>
      </div>
      <DeleteForeverIcon
        sx={{
          color: "white",
          position: "absolute",
          right: "2%",
          bottom: "2%",
        }}
      ></DeleteForeverIcon>
    </div>
  );
}

EnlargedPhoto.propTypes = {
  largePhoto: PropTypes.string.isRequired,
  setLargePhotoActive: PropTypes.func.isRequired,
};

export default EnlargedPhoto;
