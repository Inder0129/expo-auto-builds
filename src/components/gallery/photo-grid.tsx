import React from 'react';
import { View, FlatList, Image, TouchableOpacity } from 'react-native';
import { Photo } from '../../types';
import styles from '../../styles/gallery';

type PhotoGridProps = {
  photos: Photo[];
  selectedIds: string[];
  onPhotoPress: (photo: Photo) => void;
  onPhotoLongPress: (photo: Photo) => void;
};

export function PhotoGrid({ photos, selectedIds, onPhotoPress, onPhotoLongPress }: PhotoGridProps) {
  const renderItem = ({ item }: { item: Photo }) => {
    const isSelected = selectedIds.includes(item.id);
    return (
      <TouchableOpacity
        style={[styles.gridItem, isSelected && { opacity: 0.7 }]}
        onPress={() => onPhotoPress(item)}
        onLongPress={() => onPhotoLongPress(item)}
      >
        <Image
          source={{ uri: item.uri }}
          style={{ width: 100, height: 100, borderRadius: 8 }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={photos}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={3}
      contentContainerStyle={styles.grid}
    />
  );
}
