import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import notificationReducer from "./notificationSlice";
import currentAlbumReducer from "./currentAlbumSlice";
export default configureStore({
  reducer: {
    currentUser: userReducer,
    notifications: notificationReducer,
    currentAlbum: currentAlbumReducer
    
  },
});
