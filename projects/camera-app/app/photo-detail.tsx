import React, { useCallback, useMemo } from 'react';
import { View, Image, ScrollView, Dimensions, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { PhotoViewer } from '@/src/components/photo-detail/photo-viewer';
import { EditToolbar } from '@/src/components/photo-detail/edit-toolbar';
import { Button, Header, IconButton } from '@/src/components/ui';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { deletePhoto } from '@/src/store/slices/gallery';
import { Photo } from '@/src/types';
import { colors } from '@/src/theme';
import { styles } from '@/src/styles/photo-detail';

export default function PhotoDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const photos = useAppSelector((state: any) => state.gallery.photos);
  
  const photo = useMemo((): Photo | undefined => {
    return photos.find((item: Photo) => item.id === params.id);
  }, [photos, params.id]);
  
  const handleEdit = useCallback((): void => {
    if (photo) {
      router.push({ pathname: '/edit-photo', params: { id: photo.id } });
    }
  }, [photo, router]);
  
  const handleDelete = useCallback((): void => {
    if (photo) {
      Alert.alert(
        'Delete Photo',
        'Are you sure you want to delete this photo?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Delete', 
            style: 'destructive',
            onPress: (): void => {
              dispatch(deletePhoto(photo.id));
              router.back();
            }
          }
        ]
      );
    }
  }, [photo, dispatch, router]);
  
  const handleShare = useCallback((): void => {
    // TODO: Implement share functionality
    Alert.alert('Share', 'Share functionality coming soon');
  }, []);
  
  if (!photo) {
    return (
      <View style={styles.container}>
        <Header title="Photo Not Found" />
        <Button title="Go Back" onPress={(): void => router.back()} />
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Header 
        title="Photo Details" 
        leftAction={(
          <IconButton 
            icon={<Ionicons name="arrow-back" size={24} color={colors.text.primary} />} 
            onPress={(): void => router.back()} 
          />
        )}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <PhotoViewer photo={photo} />
        
        <EditToolbar 
          onEdit={handleEdit}
          onDelete={handleDelete}
          onShare={handleShare}
        />
        
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Ionicons name="calendar" size={20} color={colors.text.secondary} />
            <Text style={styles.infoText}>{photo.date}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="information-circle" size={20} color={colors.text.secondary} />
            <Text style={styles.infoText}>{photo.size}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
