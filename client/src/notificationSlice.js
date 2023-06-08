import { createSlice } from "@reduxjs/toolkit";

export const notifications = createSlice({
  name: "notifications",
  initialState: {
    albumInvite: true,
  },
  reducers: {
    toggleInvites: (state) => {
      state.albumInvite = !state.albumInvite;
      console.log(state.albumInvite)
    },
  },
});

export const { toggleInvites } = notifications.actions;

export default notifications.reducer;
