import React, { useCallback, useState, useMemo } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { EditCanvas } from '@/src/components/edit-photo/edit-canvas';
import { FilterPicker } from '@/src/components/edit-photo/filter-picker';
import { AdjustmentSliders } from '@/src/components/edit-photo/adjustment-sliders';
import { Button, Header, IconButton } from '@/src/components/ui';
import { useAppSelector } from '@/src/store/hooks';
import { Photo, Filter, Adjustment } from '@/src/types';
import { colors } from '@/src/theme';
import { styles } from '@/src/styles/edit-photo';

export default function EditPhotoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const photos = useAppSelector((state: any) => state.gallery.photos);
  
  const [selectedFilter, setSelectedFilter] = useState<Filter>('none');
  const [adjustments, setAdjustments] = useState<Adjustment>({
    brightness: 0,
    contrast: 0,
    saturation: 0,
    warmth: 0
  });
  
  const photo = useMemo((): Photo | undefined => {
    return photos.find((item: Photo) => item.id === params.id);
  }, [photos, params.id]);
  
  const handleSave = useCallback((): void => {
    // TODO: Implement save functionality
    Alert.alert('Success', 'Photo saved successfully');
    router.back();
  }, [router]);
  
  const handleCancel = useCallback((): void => {
    Alert.alert(
      'Discard Changes',
      'Are you sure you want to discard all changes?',
      [
        { text: 'Keep Editing', style: 'cancel' },
        { 
          text: 'Discard', 
          style: 'destructive',
          onPress: (): void => router.back()
        }
      ]
    );
  }, [router]);
  
  const handleFilterSelect = useCallback((filter: Filter): void => {
    setSelectedFilter(filter);
  }, []);
  
  const handleAdjustmentChange = useCallback((key: keyof Adjustment, value: number): void => {
    setAdjustments(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);
  
  const handleReset = useCallback((): void => {
    setSelectedFilter('none');
    setAdjustments({
      brightness: 0,
      contrast: 0,
      saturation: 0,
      warmth: 0
    });
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
        title="Edit Photo" 
        leftAction={(
          <IconButton 
            icon={<Ionicons name="close" size={24} color={colors.text.primary} />} 
            onPress={handleCancel} 
          />
        )}
        rightAction={(
          <IconButton 
            icon={<Ionicons name="checkmark" size={24} color={colors.primary} />} 
            onPress={handleSave} 
          />
        )}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <EditCanvas 
          photo={photo}
          filter={selectedFilter}
          adjustments={adjustments}
        />
        
        <View style={styles.controlsContainer}>
          <FilterPicker 
            selectedFilter={selectedFilter}
            onSelectFilter={handleFilterSelect}
          />
          
          <AdjustmentSliders 
            adjustments={adjustments}
            onChange={handleAdjustmentChange}
          />
          
          <View style={styles.buttonRow}>
            <Button 
              title="Reset" 
              variant="outline" 
              onPress={handleReset}
              style={styles.resetButton}
            />
            <Button 
              title="Save" 
              onPress={handleSave}
              style={styles.saveButton}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
