import React from "react";
import { useState } from "react";
import { createAlbum } from "../ApiClient";
import { useDispatch } from "react-redux";
import { updateUploadedAlbums } from "../userSlice";
import "./NewAlbum.css";
import { toggleAddAlbumPopup } from "../notificationSlice";
import { updateCurrentAlbum } from "../currentAlbumSlice";
import { useNavigate } from "react-router-dom";
function NewAlbum(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialState = {
    albumName: "",
    photos : []
  };
  const [state, setState] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { albumName } = state;
    const album = { albumName };

    let newAlbum = await createAlbum(album);

    dispatch(updateUploadedAlbums(newAlbum));
    dispatch(updateCurrentAlbum(newAlbum));
    console.log(newAlbum)
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
