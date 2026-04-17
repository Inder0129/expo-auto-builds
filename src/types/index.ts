export interface Photo {
  id: string;
  uri: string;
  name: string;
  size: string;
  date: string;
  albumId: string;
  isFavorite?: boolean;
}

export interface Album {
  id: string;
  name: string;
  count: number;
  coverUri?: string;
}

export type ThemeMode = 'light' | 'dark';

export type AlbumType = 'all' | 'favorites' | 'recent' | 'custom';