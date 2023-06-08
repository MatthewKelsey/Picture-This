import React from "react";
import { useState } from "react";
import { createAlbum } from "../ApiClient";
import { useDispatch } from "react-redux";
import{addAlbum} from '../userSlice'
function NewAlbum(props) {
  const dispatch = useDispatch()
  const initialState = {
    albumName: "",
  };
  const [state, setState] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { albumName } = state;
    const album = { albumName };

    let newAlbum = await createAlbum(album);

    dispatch(addAlbum(newAlbum))
   
    props.setAlbumPopup(false);
  };
  const close = () => {
    props.setAlbumPopup(false);
  };
  //   const loginHandle = () =>{
  //     navigate("/login")}

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
    <section className="register">
      <br></br>
      <div onClick={close} className="top-right">
        X
      </div>
      <div>
        <img src="../picture-this1.png" alt="this"></img>
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
