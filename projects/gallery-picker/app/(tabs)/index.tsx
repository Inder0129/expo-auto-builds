import React, { useCallback, useMemo } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector, useAppDispatch } from '../../src/store/hooks';
import { toggleSelection, clearSelection } from '../../src/store/slices/selection';
import { PhotoGrid } from '../../src/components/gallery/photo-grid';
import { Header } from '../../src/components/gallery/header';
import { SelectionBar } from '../../src/components/gallery/selection-bar';
import { WrapperView } from '../../src/components/ui';
import { Photo } from '../../src/types';
import styles from '../../src/styles/gallery';

export default function GalleryScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const photos = useAppSelector((state) => state.gallery.photos);
  const selectedIds = useAppSelector((state) => state.selection.selectedIds);
  const isSelectionMode = selectedIds.length > 0;

  const handlePhotoPress = useCallback((photo: Photo) => {
    if (isSelectionMode) {
      dispatch(toggleSelection(photo.id));
    } else {
      router.push({ pathname: '/photo-detail', params: { id: photo.id } });
    }
  }, [isSelectionMode, dispatch, router]);

  const handlePhotoLongPress = useCallback((photo: Photo) => {
    dispatch(toggleSelection(photo.id));
  }, [dispatch]);

  const handleClearSelection = useCallback(() => {
    dispatch(clearSelection());
  }, [dispatch]);

  const memoizedPhotos = useMemo(() => photos, [photos]);

  return (
    <WrapperView>
      <Header title="Gallery" showBack={false} />
      <PhotoGrid
        photos={memoizedPhotos}
        selectedIds={selectedIds}
        onPhotoPress={handlePhotoPress}
        onPhotoLongPress={handlePhotoLongPress}
      />
      {isSelectionMode && (
        <SelectionBar
          selectedCount={selectedIds.length}
          onClear={handleClearSelection}
        />
      )}
    </WrapperView>
  );
}
