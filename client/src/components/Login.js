import React from "react";
// import auth from '../utils/auth';
import { login } from "../ApiClient";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {ReactComponent as Logo} from './images/logo.svg'
const initialState = {
  email: "",
  password: "",
};

function Login(props) {
  let navigate = useNavigate();
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
 const moveToRegister = () =>{
  navigate('/')
 }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = state;
    const user = { email: email, password: password };
    const res = await login(user);
    console.log(res.status)
    if (res.status === 401  || res.status === 400) {
      alert(`aahahahaha`);
      setState(initialState);
    } else {
      navigate("/main");
    }
  };

  const validateForm = () => {
    return !state.email || !state.password;
  };

  return (
    <section className="register">
      <br></br>
      <Logo />
      <br></br>
      <h1>The Big Day</h1>

      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name@mail.com"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
<br></br>
        <input
          type="password"
          placeholder="supersecretthingy"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
<br></br>
        <button className="form-submit" type="submit" disabled={validateForm()}>
          &nbsp;Login&nbsp;
        </button>
      </form>
      <p>Don't have an account? Register here</p>
      <button className="form-submit" onClick={moveToRegister}>Register</button>
    </section>
  );
}
export default Login;