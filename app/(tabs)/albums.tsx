import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'expo-router';
import { useAppSelector } from '../../src/store/hooks';
import { AlbumGrid } from '../../src/components/albums/album-grid';
import { Header } from '../../src/components/gallery/header';
import { WrapperView } from '../../src/components/ui';
import { Album } from '../../src/types';
import styles from '../../src/styles/albums';
import { RootState } from '../../src/store';

export default function AlbumsScreen() {
  const router = useRouter();
  const albums = useAppSelector((state: RootState) => state.gallery.albums);

  const handleAlbumPress = useCallback((album: Album) => {
    router.push({ pathname: '/album-detail', params: { albumId: album.id } });
  }, [router]);

  const memoizedAlbums = useMemo(() => albums, [albums]);

  return (
    <WrapperView style={styles.container}>
      <Header title="Albums" showBack={false} />
      <AlbumGrid
        albums={memoizedAlbums}
        onAlbumPress={handleAlbumPress}
      />
    </WrapperView>
  );
}