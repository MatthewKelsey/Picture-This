import { createSlice } from "@reduxjs/toolkit";

export const currentAlbumSlice = createSlice({
  name: "currentAlbum",
  initialState: {
    currentAlbum: {photos: []},
    largePhotoIndex: 0,
  
     
  },
  reducers: {
    addPhoto: (state, action) => {
      state.currentAlbum.photos.push(action.payload);
    },
    removePhoto: (state, action) => {
      console.log(action.payload);
      state.currentAlbum.photos = state.currentAlbum.photos.filter((photo) => {
        return photo._id !== action.payload;
      });
    },
    updateCurrentAlbum: (state, action) => {
      state.currentAlbum = action.payload;
      console.log(state.currentAlbum);
    },
   
  },
});

export const { removePhoto, addPhoto, updateCurrentAlbum, setLargePhoto } =
  currentAlbumSlice.actions;

export default currentAlbumSlice.reducer;
