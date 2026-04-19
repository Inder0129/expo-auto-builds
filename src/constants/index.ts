export const CAMERA = {
  ASPECT_RATIO: '4:3' as const,
  MAX_ZOOM: 10,
  MIN_ZOOM: 1,
} as const;

export const GALLERY = {
  ITEMS_PER_PAGE: 20,
} as const;

export const APP = {
  NAME: 'CameraApp',
  VERSION: '1.0.0',
} as const;