import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GalleryState, Photo } from '@/src/types';

const initialState: GalleryState = {
  photos: [],
  selectedPhotoId: null,
};

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    addPhoto: (state, action: PayloadAction<Photo>) => {
      state.photos.unshift(action.payload);
    },
    removePhoto: (state, action: PayloadAction<string>) => {
      state.photos = state.photos.filter((photo: Photo) => photo.id !== action.payload);
    },
    selectPhoto: (state, action: PayloadAction<string | null>) => {
      state.selectedPhotoId = action.payload;
    },
    clearGallery: (state) => {
      state.photos = [];
    },
  },
});

export const { addPhoto, removePhoto, selectPhoto, clearGallery } = gallerySlice.actions;
export default gallerySlice.reducer;