import { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IconButton } from '../ui';
import { colors, spacing } from '../../theme';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleFavorite } from '../../store/slices/gallery';
import { Photo } from '../../types';

interface PhotoActionsProps {
  photo: Photo;
}

export function PhotoActions({ photo }: PhotoActionsProps) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.gallery.favorites);
  
  const isFavorite = favorites.includes(photo.id);
  
  const handleFavorite = useCallback(() => {
    dispatch(toggleFavorite(photo.id));
  }, [dispatch, photo.id]);
  
  const handleShare = useCallback(() => {
    // TODO: Implement share functionality
  }, []);
  
  const handleInfo = useCallback(() => {
    // TODO: Implement info modal
  }, []);
  
  return (
    <View style={styles.container}>
      <IconButton onPress={handleFavorite}>
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={24}
          color={isFavorite ? colors.error : colors.text}
        />
      </IconButton>
      <IconButton onPress={handleShare}>
        <Ionicons name="share-outline" size={24} color={colors.text} />
      </IconButton>
      <IconButton onPress={handleInfo}>
        <Ionicons name="information-circle-outline" size={24} color={colors.text} />
      </IconButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.lg,
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.sm,
  },
});