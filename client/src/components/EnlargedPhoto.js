import React from "react";
import PropTypes from "prop-types";
import './EnlargedPhoto.css'
function EnlargedPhoto({ largePhoto, setLargePhotoActive }) {
  const close = () => setLargePhotoActive(false);

  return (
    <div className="enlarged-photo">
      <img src={largePhoto} alt="Big" />
      <div className="close" onClick={close}>
        <p>close</p>
      </div>
    </div>
  );
}

EnlargedPhoto.propTypes = {
  largePhoto: PropTypes.string.isRequired,
  setLargePhotoActive: PropTypes.func.isRequired,
};

export default EnlargedPhoto;
