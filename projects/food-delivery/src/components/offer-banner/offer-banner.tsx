import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/src/theme';

interface OfferBannerProps {
  offer: {
    title: string;
    description: string;
    imageUrl: string;
  };
  style?: any;
}

export const OfferBanner: React.FC<OfferBannerProps> = (props) => {
  const { offer, style } = props;
  
  return (
    <View style={[styles.container, style]}>
      <Image
        source={{ uri: offer.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
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
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
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
    left: 16,
    bottom: 16,
    right: 16,
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
