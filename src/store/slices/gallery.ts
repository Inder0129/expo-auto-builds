import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Photo, Album } from '../../types';

interface GalleryState {
  photos: Photo[];
  albums: Album[];
  isLoading: boolean;
}

const initialState: GalleryState = {
  photos: [
    { id: '1', uri: 'https://picsum.photos/300/200?random=1', name: 'Photo 1', size: '2.4 MB', date: '2024-01-15', albumId: '1' },
    { id: '2', uri: 'https://picsum.photos/300/200?random=2', name: 'Photo 2', size: '1.8 MB', date: '2024-01-16', albumId: '1' },
    { id: '3', uri: 'https://picsum.photos/300/200?random=3', name: 'Photo 3', size: '3.2 MB', date: '2024-01-17', albumId: '2' },
    { id: '4', uri: 'https://picsum.photos/300/200?random=4', name: 'Photo 4', size: '2.1 MB', date: '2024-01-18', albumId: '2' },
    { id: '5', uri: 'https://picsum.photos/300/200?random=5', name: 'Photo 5', size: '2.9 MB', date: '2024-01-19', albumId: '3' },
    { id: '6', uri: 'https://picsum.photos/300/200?random=6', name: 'Photo 6', size: '1.5 MB', date: '2024-01-20', albumId: '3' },
  ],
  albums: [
    { id: '1', name: 'Vacation', count: 2 },
    { id: '2', name: 'Family', count: 2 },
    { id: '3', name: 'Work', count: 2 },
  ],
  isLoading: false,
};

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    setPhotos: (state, action: PayloadAction<Photo[]>) => {
      state.photos = action.payload;
    },
    setAlbums: (state, action: PayloadAction<Album[]>) => {
      state.albums = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setPhotos, setAlbums, setLoading } = gallerySlice.actions;
export default gallerySlice.reducer;