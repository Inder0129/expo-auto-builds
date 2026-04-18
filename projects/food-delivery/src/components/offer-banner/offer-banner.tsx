import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/src/theme';

interface OfferBannerProps {
  offer: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
  };
  style?: any;
}

export const OfferBanner: React.FC<OfferBannerProps> = ({ offer, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Image source={{ uri: offer.imageUrl }} style={styles.image} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{offer.title}</Text>
        <Text style={styles.description}>{offer.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
  },
  content: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
  },
});
