import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';

interface CameraControlsProps {
  onCapture: () => void;
  onToggleCamera: () => void;
  style?: any;
}

export function CameraControls(props: CameraControlsProps) {
  const { onCapture, onToggleCamera, style } = props;

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={onToggleCamera}
        activeOpacity={0.7}
      >
        <Ionicons name="camera-reverse" size={28} color={colors.white} />
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.captureButton}
        onPress={onCapture}
        activeOpacity={0.8}
      >
        <View style={styles.captureButtonInner} />
      </TouchableOpacity>
      
      <View style={styles.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  toggleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  captureButtonInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.white,
  },
  placeholder: {
    width: 50,
    height: 50,
  },
});
