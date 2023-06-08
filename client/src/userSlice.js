import { createSlice } from "@reduxjs/toolkit";

export const currentUser = createSlice({
  name: "currentUser",
  initialState: {
    email: "user",
    firstName: "user",
    lastName: "user",
    sharedAlbums: [],
    pendingInvite: [],
    uploadedAlbums: [],
  },
  reducers: {
    addAlbum: (state, action) => {
      state.uploadedAlbums.push(action.payload);
    },
    deleteAlbum: (state, action) => {
      state.uploadedAlbums = state.uploadedAlbums.filter(
        (album) => album !== action.payload
      );
    },
    updatePending: (state, action) => {
      state.pendingInvite = action.payload;
    },
    addSharedAlbum: (state, action) => {
      state.sharedAlbums.push(action.payload);
    },
    updateUser: (state, action) => {
      const { email, firstName, lastName, sharedAlbums, pendingInvite, uploadedAlbums } = action.payload;
      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
      state.sharedAlbums = sharedAlbums;
      state.pendingInvite = pendingInvite;
      state.uploadedAlbums = uploadedAlbums;
    },
  },
});

export const { addAlbum, deleteAlbum, updatePending, addSharedAlbum, updateUser } = currentUser.actions;

export default currentUser.reducer;
