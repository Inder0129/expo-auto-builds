import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native';
import { colors } from '@/src/theme';
import { spacing } from '@/src/theme';
import { typography } from '@/src/theme';

type HeroBannerProps = {
  title: string;
  subtitle: string;
  imageUrl: string;
  onPress: () => void;
  style?: any;
};

export const HeroBanner: React.FC<HeroBannerProps> = ({ title, subtitle, imageUrl, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.md,
    borderRadius: 16,
    overflow: 'hidden',
    height: 180,
    position: 'relative'
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  content: {
    position: 'absolute',
    bottom: spacing.lg,
    left: spacing.lg,
    right: spacing.lg
  },
  title: {
    ...typography.headingLarge,
    color: colors.white,
    marginBottom: spacing.xs
  },
  subtitle: {
    ...typography.bodyLarge,
    color: colors.white
  }
});