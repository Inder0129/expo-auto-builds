import { useCallback, useMemo } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { PhotoGrid } from '../src/components/album-detail/PhotoGrid';
import { AlbumHeader } from '../src/components/album-detail/AlbumHeader';
import { WrapperView } from '../src/components/ui';
import { useAppSelector } from '../src/store/hooks';
import { Album, Photo } from '../src/types';
import styles from '../src/styles/album-detail';
import { RootState } from '../src/store';

export default function AlbumDetailScreen() {
  const router = useRouter();
  const { albumId } = useLocalSearchParams<{ albumId: string }>();
  
  const albums = useAppSelector((state: RootState) => state.gallery.albums);
  const photos = useAppSelector((state: RootState) => state.gallery.photos);
  
  const selectedAlbum = useMemo(() => 
    albums.find((album: Album) => album.id === albumId),
    [albums, albumId]
  );
  
  const albumPhotos = useMemo(() => 
    photos.filter((photo: Photo) => photo.albumId === albumId),
    [photos, albumId]
  );
  
  const handleClose = useCallback(() => {
    router.back();
  }, [router]);
  
  if (!selectedAlbum) {
    return null;
  }
  
  return (
    <WrapperView style={styles.container}>
      <AlbumHeader album={selectedAlbum} onClose={handleClose} />
      <PhotoGrid photos={albumPhotos} albumId={albumId} />
    </WrapperView>
  );
}