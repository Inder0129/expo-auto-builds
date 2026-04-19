import React from 'react';
import { View, FlatList, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { PhotoItem } from '@/src/types';
import { colors } from '@/src/theme';

interface PhotoGridProps {
  photos: PhotoItem[];
  selectedIds: string[];
  onPhotoPress: (photo: PhotoItem) => void;
  onPhotoLongPress: (photo: PhotoItem) => void;
  numColumns: number;
  style?: any;
}

export function PhotoGrid(props: PhotoGridProps) {
  const { photos, selectedIds, onPhotoPress, onPhotoLongPress, numColumns, style } = props;

  const renderPhoto = ({ item }: { item: PhotoItem }) => {
    const isSelected = selectedIds.includes(item.id);
    const selectionIndex = selectedIds.indexOf(item.id) + 1;

    return (
      <TouchableOpacity
        style={styles.photoContainer}
        onPress={() => onPhotoPress(item)}
        onLongPress={() => onPhotoLongPress(item)}
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: item.uri }}
          style={styles.photoImage}
          resizeMode="cover"
        />
        
        {isSelected && (
          <View style={styles.selectedOverlay}>
            <View style={styles.selectionBadge}>
              <Text style={styles.badgeText}>{selectionIndex}</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={photos}
      renderItem={renderPhoto}
      keyExtractor={(item: PhotoItem) => item.id}
      numColumns={numColumns}
      contentContainerStyle={[styles.gridContainer, style]}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    padding: 2,
  },
  photoContainer: {
    aspectRatio: 1,
    margin: 1,
    backgroundColor: colors.surface,
    borderRadius: 4,
    overflow: 'hidden',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  selectedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 122, 255, 0.3)',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  selectionBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
