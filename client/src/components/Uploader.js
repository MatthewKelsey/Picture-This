import React, { useState } from "react";

function Uploader(props) {
  const [fileInputState] = useState("");

  const [previewSource, setPreviewSource] = useState();
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const close = () => {
    props.setShowUpload(false);
  };
  const handleSubmitFile = (e) => {
    props.setShowUpload(false);

    e.preventDefault();
    if (!previewSource) return;

    uploadImage({
      album: props.currentAlbum._id,
      data: previewSource,
      admin: props.currentAlbum.owner,
    });
  };

  const uploadImage = async (obj) => {
    try {
      const result = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
          "Access-Control-Allow-Methods":
            "GET, HEAD, POST, PUT, DELETE, OPTIONS",
        },
        credentials: "include",
      });
      const newImg = await result.json();

      const newArr = [newImg, ...props.photos];
      props.setPhotos(newArr);
    } catch (error) {
      console.log(error);
    }
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
        <button className="btn" type="submit">
          {" "}
          Submit
        </button>
      </form>
      {previewSource && (
        <div className= 'uploader-image'>
        <img src={previewSource} alt="chosen" style={{ height: "200px" }} /></div>
      )}
    </div>
  );
}

export default Uploader;
