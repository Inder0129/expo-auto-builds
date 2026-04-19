import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FlashMode } from 'expo-camera';
import { colors } from '@/src/theme';

interface FlashToggleProps {
  flashMode: FlashMode;
  onToggle: () => void;
  style?: any;
}

export function FlashToggle(props: FlashToggleProps) {
  const { flashMode, onToggle, style } = props;

  const getIconName = (mode: FlashMode): keyof typeof Ionicons.glyphMap => {
    switch (mode) {
      case 'on': return 'flash';
      case 'off': return 'flash-off';
      case 'auto': return 'flash-auto';
      default: return 'flash-off';
    }
  };

  const getIconColor = (mode: FlashMode): string => {
    return mode === 'off' ? colors.white : colors.warning;
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <Ionicons
        name={getIconName(flashMode)}
        size={28}
        color={getIconColor(flashMode)}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
