import { useCallback } from 'react';
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme';
import { useAppSelector } from '../../store/hooks';
import { Photo } from '../../types';

interface PhotoGridItemProps {
  photo: Photo;
  size: number;
  onPress: () => void;
}

export function PhotoGridItem({ photo, size, onPress }: PhotoGridItemProps) {
  const favorites = useAppSelector((state) => state.gallery.favorites);
  const isFavorite = favorites.includes(photo.id);
  
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, { width: size, height: size }]}>
      <Image source={{ uri: photo.uri }} style={styles.image} />
      {isFavorite && (
        <View style={styles.favoriteBadge}>
          <Ionicons name="heart" size={12} color={colors.error} />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 2,
  },
});