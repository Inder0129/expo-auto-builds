export interface Photo {
  id: string;
  uri: string;
  name: string;
  size: string;
  date: string;
  albumId: string;
}

export interface Album {
  id: string;
  name: string;
  count: number;
}

export type ThemeMode = 'light' | 'dark';

export type AlbumType = 'all' | 'favorites' | 'recent' | 'custom';