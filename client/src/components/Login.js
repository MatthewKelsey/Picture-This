import React from "react";
import { login } from "../ApiClient";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../userSlice";

const initialState = {
  email: "",
  password: "",
};

function Login(props) {
  let navigate = useNavigate();
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const moveToRegister = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = state;
    const user = { email: email, password: password };
    const res = await login(user);
    if (res.status === 401 || res.status === 400) {
      alert("Error");
      setState(initialState);
    } else {
      console.log("hello");
      props.setCurrentUser(res);
      dispatch(updateUser(res));
      console.log(currentUser.email);
      navigate("/profile");
    }
  };

  const validateForm = () => {
    return !state.email || !state.password;
  };

  return (
    <section className="register">
      <br />
      <img className="logoting" src="../logoting.png" alt="logo" />

      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name@mail.com"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          placeholder="supersecretthingy"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <br />
        <button
          className="form-submit"
          type="submit"
          disabled={validateForm()}
        >
          &nbsp;Login&nbsp;
        </button>
      </form>
      <p>Don't have an account? Register here</p>
      <button className="form-submit" onClick={moveToRegister}>
        Register
      </button>
    </section>
  );
}

export default Login;
