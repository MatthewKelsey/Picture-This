import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { reg } from "../ApiClient";
import { useDispatch } from "react-redux";
import { updateUser } from "../userSlice";

import './Register.css'
const initialState = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};

const Register = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const [exists, setExists] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, firstName, lastName } = state;
    const user = { email, password, firstName, lastName };
    const res = await reg(user);
    if (res.status === 409) {
      alert(`${res.message}`);
      setState(initialState);
      setExists(true);
    } else {
      dispatch(updateUser(res))
      navigate("/profile");
    }
  };

  const loginHandle = () => {
    navigate("/login");
  };

  const validateForm = () => {
    return (
      !state.email || !state.password || !state.firstName || !state.lastName
    );
  };

  return (
    <section className="register">
      
      <br></br>
      
      <h2>Register</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <br></br>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <br></br>
        <input
          type="text"
          placeholder="First name"
          name="firstName"
          value={state.firstName}
          onChange={handleChange}
        />
        <br></br>
        <input
          type="text"
          placeholder="Surname"
          name="lastName"
          value={state.lastName}
          onChange={handleChange}
        />
        <br></br>
        <button className="form-submit" type="submit" disabled={validateForm()}>
          &nbsp;Register&nbsp;
        </button>
      </form>
      <br></br>
      {exists ? <p> User already exists. Please login</p> : "Already a user?"}
      <br></br>
      <br></br>
      <button onClick={loginHandle} className="form-submit">
        Login
      </button>
    </section>
  );
};

export default Register;
