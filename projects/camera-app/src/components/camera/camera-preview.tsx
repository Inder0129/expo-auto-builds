import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Button } from '@/src/components/ui';
import { colors } from '@/src/theme';

interface CameraPreviewProps {
  photoUri: string;
  onRetake: () => void;
  onSave: () => void;
  onEdit: () => void;
  style?: any;
}

export function CameraPreview(props: CameraPreviewProps) {
  const { photoUri, onRetake, onSave, onEdit, style } = props;

  return (
    <View style={[styles.container, style]}>
      <Image
        source={{ uri: photoUri }}
        style={styles.image}
        resizeMode="contain"
      />
      
      <View style={styles.controls}>
        <Button
          title="Retake"
          onPress={onRetake}
          variant="outline"
          style={styles.button}
        />
        <Button
          title="Save"
          onPress={onSave}
          variant="primary"
          style={styles.button}
        />
        <Button
          title="Edit"
          onPress={onEdit}
          variant="secondary"
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: colors.surface,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});
