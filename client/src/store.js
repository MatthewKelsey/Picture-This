import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import notificationReducer from "./notificationSlice";
export default configureStore({
  reducer: {
    currentUser: userReducer,
    notifications: notificationReducer,
  },
});
