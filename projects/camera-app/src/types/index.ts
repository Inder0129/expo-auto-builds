export interface Photo {
  id: string;
  uri: string;
  date: string;
  size: string;
  location?: string;
}

export type Filter = 'none' | 'vintage' | 'blackWhite' | 'warm' | 'cool' | 'vibrant';

export interface Adjustment {
  brightness: number;
  contrast: number;
  saturation: number;
  warmth: number;
}
