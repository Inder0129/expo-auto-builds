import React, { useCallback, useMemo } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector } from '../../src/store/hooks';
import { AlbumGrid } from '../../src/components/albums/album-grid';
import { Header } from '../../src/components/gallery/header';
import { WrapperView } from '../../src/components/ui';
import { Album } from '../../src/types';
import styles from '../../src/styles/albums';

export default function AlbumsScreen() {
  const router = useRouter();
  const albums = useAppSelector((state) => state.gallery.albums);

  const handleAlbumPress = useCallback((album: Album) => {
    router.push({ pathname: '/album-detail', params: { id: album.id } });
  }, [router]);

  const memoizedAlbums = useMemo(() => albums, [albums]);

  return (
    <WrapperView>
      <Header title="Albums" showBack={false} />
      <AlbumGrid
        albums={memoizedAlbums}
        onAlbumPress={handleAlbumPress}
      />
    </WrapperView>
  );
}
