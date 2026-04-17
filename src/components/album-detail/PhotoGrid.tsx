import { useCallback } from 'react';
import { FlatList, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { PhotoGridItem } from './PhotoGridItem';
import { colors, spacing } from '@/src/theme';
import { Photo } from '@/src/types';

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 3;
const ITEM_SIZE = (width - spacing.md * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

interface PhotoGridProps {
  photos: Photo[];
  albumId: string;
}

export function PhotoGrid({ photos, albumId }: PhotoGridProps) {
  const router = useRouter();
  
  const handlePhotoPress = useCallback((photoId: string) => {
    router.push({
      pathname: '/photo-detail',
      params: { photoId },
    });
  }, [router]);
  
  const renderItem = useCallback(({ item }: { item: Photo }) => (
    <PhotoGridItem
      photo={item}
      size={ITEM_SIZE}
      onPress={() => handlePhotoPress(item.id)}
    />
  ), [handlePhotoPress, ITEM_SIZE]);
  
  return (
    <FlatList
      data={photos}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={NUM_COLUMNS}
      contentContainerStyle={styles.container}
      columnWrapperStyle={styles.columnWrapper}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    backgroundColor: colors.background,
  },
  columnWrapper: {
    gap: spacing.md,
    marginBottom: spacing.md,
  },
});