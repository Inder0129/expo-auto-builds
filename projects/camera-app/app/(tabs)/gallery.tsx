import React, { useCallback, useState, useMemo } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector, useAppDispatch } from '@/src/store/hooks';
import { selectAllPhotos, deletePhotos } from '@/src/store/slices/gallery';
import { PhotoGrid } from '@/src/components/gallery/photo-grid';
import { SelectionToolbar } from '@/src/components/gallery/selection-toolbar';
import { PhotoItem } from '@/src/types';
import { colors } from '@/src/theme';
import styles from '@/src/styles/gallery';

interface GalleryScreenProps {}

export default function GalleryScreen(props: GalleryScreenProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectAllPhotos);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState<boolean>(false);

  const handlePhotoPress = useCallback((photo: PhotoItem) => {
    if (isSelectionMode) {
      setSelectedIds((current: string[]) => {
        if (current.includes(photo.id)) {
          return current.filter((id: string) => id !== photo.id);
        } else {
          return [...current, photo.id];
        }
      });
    } else {
      router.push({
        pathname: '/photo-detail',
        params: { photoId: photo.id }
      });
    }
  }, [isSelectionMode, router]);

  const handlePhotoLongPress = useCallback((photo: PhotoItem) => {
    setIsSelectionMode(true);
    setSelectedIds([photo.id]);
  }, []);

  const handleToggleSelectionMode = useCallback(() => {
    setIsSelectionMode((current: boolean) => !current);
    setSelectedIds([]);
  }, []);

  const handleDeleteSelected = useCallback(() => {
    if (selectedIds.length === 0) return;
    
    Alert.alert(
      'Delete Photos',
      `Are you sure you want to delete ${selectedIds.length} photo(s)?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            dispatch(deletePhotos(selectedIds));
            setSelectedIds([]);
            setIsSelectionMode(false);
          }
        }
      ]
    );
  }, [selectedIds, dispatch]);

  const handleSelectAll = useCallback(() => {
    if (selectedIds.length === photos.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(photos.map((photo: PhotoItem) => photo.id));
    }
  }, [photos, selectedIds.length]);

  const memoizedPhotos = useMemo(() => photos, [photos]);

  return (
    <View style={styles.container}>
      <PhotoGrid
        photos={memoizedPhotos}
        selectedIds={selectedIds}
        onPhotoPress={handlePhotoPress}
        onPhotoLongPress={handlePhotoLongPress}
        numColumns={3}
      />
      
      {isSelectionMode && (
        <SelectionToolbar
          selectedCount={selectedIds.length}
          totalCount={photos.length}
          onDelete={handleDeleteSelected}
          onSelectAll={handleSelectAll}
          onCancel={handleToggleSelectionMode}
        />
      )}
    </View>
  );
}
