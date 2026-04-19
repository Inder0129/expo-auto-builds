import React, { useCallback, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { CameraType, FlashMode } from 'expo-camera';
import { useAppDispatch } from '@/src/store/hooks';
import { capturePhoto } from '@/src/store/slices/camera';
import { CameraControls } from '@/src/components/camera/camera-controls';
import { FlashToggle } from '@/src/components/camera/flash-toggle';
import { CameraPreview } from '@/src/components/camera/camera-preview';
import { colors } from '@/src/theme';
import { Button } from '@/src/components/ui';
import styles from '@/src/styles/camera';

interface CameraScreenProps {}

export default function CameraScreen(props: CameraScreenProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState<CameraType>('back');
  const [flashMode, setFlashMode] = useState<FlashMode>('off');
  const [isPreviewVisible, setIsPreviewVisible] = useState<boolean>(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  const handleCapture = useCallback(async () => {
    if (!cameraRef.current) return;
    
    try {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo?.uri) {
        setCapturedPhoto(photo.uri);
        setIsPreviewVisible(true);
        dispatch(capturePhoto(photo.uri));
      }
    } catch (error: any) {
      Alert.alert('Error', 'Failed to capture photo');
    }
  }, [dispatch]);

  const handleToggleCamera = useCallback(() => {
    setCameraType((current: CameraType) => current === 'back' ? 'front' : 'back');
  }, []);

  const handleToggleFlash = useCallback(() => {
    setFlashMode((current: FlashMode) => {
      if (current === 'off') return 'on';
      if (current === 'on') return 'auto';
      return 'off';
    });
  }, []);

  const handleRetake = useCallback(() => {
    setCapturedPhoto(null);
    setIsPreviewVisible(false);
  }, []);

  const handleSave = useCallback(() => {
    router.push('/gallery');
  }, [router]);

  const handleEdit = useCallback(() => {
    if (capturedPhoto) {
      router.push({
        pathname: '/edit-photo',
        params: { photoUri: capturedPhoto }
      });
    }
  }, [capturedPhoto, router]);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Button
          title="Grant Camera Permission"
          onPress={requestPermission}
          variant="primary"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isPreviewVisible && capturedPhoto ? (
        <CameraPreview
          photoUri={capturedPhoto}
          onRetake={handleRetake}
          onSave={handleSave}
          onEdit={handleEdit}
        />
      ) : (
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={cameraType}
          flash={flashMode}
        />
      )}
      
      {!isPreviewVisible && (
        <View style={styles.controlsContainer}>
          <FlashToggle
            flashMode={flashMode}
            onToggle={handleToggleFlash}
          />
          <CameraControls
            onCapture={handleCapture}
            onToggleCamera={handleToggleCamera}
          />
        </View>
      )}
    </View>
  );
}
