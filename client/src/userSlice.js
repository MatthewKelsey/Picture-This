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
    _id: undefined,
  },
  reducers: {
    updateUploadedAlbums: (state, action) => {
      state.uploadedAlbums = action.payload;
    },

    updatePending: (state, action) => {
      console.log("reached pending", action.payload);
      state.pendingInvite = action.payload;
    },
    addSharedAlbum: (state, action) => {
      state.sharedAlbums.push(action.payload);
    },
    updateUser: (state, action) => {
      const {
        email,
        firstName,
        lastName,
        sharedAlbums,
        pendingInvite,
        uploadedAlbums,
      } = action.payload;
      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
      state.sharedAlbums = sharedAlbums;
      state.pendingInvite = pendingInvite;
      state.uploadedAlbums = uploadedAlbums;
    },
  },
});

export const {
  updatePending,
  addSharedAlbum,
  updateUser,
  updateUploadedAlbums,
} = currentUser.actions;

export default currentUser.reducer;
