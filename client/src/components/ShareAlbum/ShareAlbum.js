import React from "react";
import { useState } from "react";
import { shareAlbumRequest } from "../../ApiClient";
// import { useDispatch } from "react-redux";
import "./ShareAlbum.css";
import { useSelector } from "react-redux";
function ShareAlbum(props) {
  const initialState = {
    email: "",
  };
  const currentUser = useSelector((state) => state.currentUser._id);
  const [state, setState] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email } = state;
    // const res =
    await shareAlbumRequest({
      email: email,
      albumId: props.currentAlbum._id,
      user: currentUser,
    });
    props.setSharePopup(false);
  };
  const validateForm = () => {
    return !state.email;
  };
  const close = () => {
    props.setSharePopup(false);
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

      <br></br>
      <div className="top-right" onClick={close}>
        X
      </div>
      <h2>Share Album </h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
          label="Email Address"
        />
        <br></br>
        <button className="form-submit" type="submit" disabled={validateForm()}>
          &nbsp;Submit&nbsp;{" "}
        </button>
      </form>
    </section>
  );
}

export default ShareAlbum;
