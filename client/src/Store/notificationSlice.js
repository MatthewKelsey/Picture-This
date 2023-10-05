import { createSlice } from "@reduxjs/toolkit";

export const notifications = createSlice({
  name: "notifications",
  initialState: {
    albumInvite: false,
    sharePopup: false,
    addAlbumPopup: false,
  },
  reducers: {
    toggleInvites: (state) => {
      state.albumInvite = !state.albumInvite;
    },
    toggleSarePopup: (state) => {
      state.sharePopup = !state.sharePopup;
    },
    toggleAddAlbumPopup: (state) => {
      state.addAlbumPopup = !state.addAlbumPopup;
    },
  },
});

export const { toggleInvites, toggleSarePopup, toggleAddAlbumPopup } = notifications.actions;

export default notifications.reducer;
