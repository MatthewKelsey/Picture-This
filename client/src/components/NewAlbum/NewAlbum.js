import React from "react";
import { useState } from "react";
import { createAlbum } from "../../ApiClient";
import { useDispatch, useSelector } from "react-redux";
import { updateUploadedAlbums } from "../../Store/userSlice";
import "./NewAlbum.css";
import { toggleAddAlbumPopup } from "../../Store/notificationSlice";
import { updateCurrentAlbum } from "../../Store/currentAlbumSlice";
import { useNavigate } from "react-router-dom";
function NewAlbum(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state)=> state.currentUser._id)

  const initialState = {
    albumName: "",
    uploader: currentUser,
    photos : []
  };
  const [state, setState] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const album = state;

    let newAlbum = await createAlbum(album);

    dispatch(updateUploadedAlbums(newAlbum));
    dispatch(updateCurrentAlbum(newAlbum));
    dispatch(toggleAddAlbumPopup());
    dispatch(updateCurrentAlbum(newAlbum));
    navigate('/main')
  };
  const close = () => {
    dispatch(toggleAddAlbumPopup());
  };

  const validateForm = () => {
    return !state.albumName;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <section className="new-album-form">
      <br></br>
      <div onClick={close} className="top-right">
        X
      </div>

      <br></br>

      <h2>New Album</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Album name"
          name="albumName"
          value={state.albumName}
          onChange={handleChange}
        />
        <br></br>
        <button className="form-submit" type="submit" disabled={validateForm()}>
          &nbsp;Create Album&nbsp;
        </button>
      </form>
    </section>
  );
}

export default NewAlbum;
