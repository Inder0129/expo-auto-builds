import { useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { PhotoViewer } from '@/src/components/photo-detail/PhotoViewer';
import { PhotoActions } from '@/src/components/photo-detail/PhotoActions';
import { WrapperView } from '@/src/components/ui';
import { useAppSelector } from '@/src/store/hooks';
import { Photo } from '@/src/types';
import styles from '@/src/styles/photo-detail';

export default function PhotoDetailScreen() {
  const router = useRouter();
  const { photoId } = useLocalSearchParams<{ photoId: string }>();
  
  const photos = useAppSelector((state) => state.gallery.photos);
  const selectedPhoto = useMemo(() => 
    photos.find((photo: Photo) => photo.id === photoId),
    [photos, photoId]
  );
  
  const handleClose = useCallback(() => {
    router.back();
  }, [router]);
  
  if (!selectedPhoto) {
    return null;
  }
  
  return (
    <WrapperView style={styles.container}>
      <PhotoViewer photo={selectedPhoto} onClose={handleClose} />
      <PhotoActions photo={selectedPhoto} />
    </WrapperView>
  );
}