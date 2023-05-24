import React, { useState } from "react";
import { uploadPhoto } from "../ApiClient";

function Uploader(props) {
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState([]);

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      previewFile(files[i]);
    }
    setFileInputState("");
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource((prevPreviewSource) => [
        ...prevPreviewSource,
        reader.result,
      ]);
    };
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();
    for (let i = 0; i < previewSource.length; i++) {
      await uploadPhoto({
        album: props.currentAlbum._id,
        data: previewSource[i],
        admin: props.currentAlbum.owner,
      });
      setPreviewSource((prevState) =>
        prevState.filter((_, index) => index !== i)
      );
    }
    props.setShowUpload(false);
  };

  const close = () => {
    props.setShowUpload(false);
  };

  return (
    <div className="uploader">
      <div onClick={close} className="top-right">
        X
      </div>
      <br></br>
      <form className="center" onSubmit={handleSubmitFile}>
        <input
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
          className="form-input"
          multiple
        />
        <button className="btn" type="submit" disabled={!previewSource.length}>
          Submit
        </button>
      </form>
      {previewSource.length > 0 && (
        <div className="uploader-image">
          {previewSource.map((source, index) => (
            <img
              key={index}
              src={source}
              alt="chosen"
              style={{ height: "200px", margin: "5px" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Uploader;
