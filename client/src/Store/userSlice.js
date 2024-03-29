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
    _id: "user",
  },
  reducers: {
    updateUploadedAlbums: (state, action) => {
      state.uploadedAlbums = action.payload;
    },

    updatePending: (state, action) => {
      state.pendingInvite = action.payload;
    },
    addSharedAlbum: (state, action) => {
      state.sharedAlbums.push(action.payload);
    },
    updateSharedAlbum: (state, action) =>{
      state.sharedAlbums = action.payload
    },

    updateUser: (state, action) => {
      const {
        email,
        firstName,
        lastName,
        sharedAlbums,
        pendingInvite,
        uploadedAlbums,
        _id
      } = action.payload;
      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
      state.sharedAlbums = sharedAlbums;
      state.pendingInvite = pendingInvite;
      state.uploadedAlbums = uploadedAlbums;
      state._id = _id
      console.log(state.email)
    },
  },
});

export const {
  updateSharedAlbum,
  updatePending,
  addSharedAlbum,
  updateUser,
  updateUploadedAlbums,
} = currentUser.actions;

export default currentUser.reducer;
