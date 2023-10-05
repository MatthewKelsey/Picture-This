import Main from "./components/Main/Main";
// import Login from "./components/Login";
import Profile from "./components/Profile/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Register from "./components/Register";
import NewAlbum from "./components/NewAlbum/NewAlbum";
import { useState } from "react";
import Invites from "./components/InviteList/Invites";
import MainShare from "./components/MainShare/MainShare";
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [currentAlbum, setCurrentAlbum] = useState({});
  // const notificationBell = useSelector((state) =>  state.notifications.albumInvite);
 
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar currentUser={currentUser} />
     
        <Routes>
          <Route
            path="/main"
            element={
              <Main
                currentAlbum={currentAlbum}
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            }
          />
          <Route
            path="/login"
            element={<SignIn setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="/"
            element={<SignUp setCurrentUser={setCurrentUser} />}
          />
          <Route path="/new" element={<NewAlbum />} />
          <Route
            path="/profile"
            element={
              <Profile
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
                currentAlbum={currentAlbum}
                setCurrentAlbum={setCurrentAlbum}
              />
            }
          />
          <Route path="/help" element={<Invites currentUser={currentUser} />} />
          <Route
            path="/main-share"
            element={
              <MainShare
                currentAlbum={currentAlbum}
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
