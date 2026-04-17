import React from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { Album } from '../../types';
import styles from '../../styles/albums';

type AlbumGridProps = {
  albums: Album[];
  onAlbumPress: (album: Album) => void;
};

export function AlbumGrid({ albums, onAlbumPress }: AlbumGridProps) {
  const renderItem = ({ item }: { item: Album }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => onAlbumPress(item)}
    >
      <Image
        source={{ uri: item.coverUri }}
        style={{ width: 150, height: 150, borderRadius: 12 }}
      />
      <Text style={{ marginTop: 8, fontSize: 16, fontWeight: '600' }}>
        {item.name}
      </Text>
      <Text style={{ fontSize: 14, color: '#666' }}>
        {item.count} photos
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={albums}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.grid}
    />
  );
}
