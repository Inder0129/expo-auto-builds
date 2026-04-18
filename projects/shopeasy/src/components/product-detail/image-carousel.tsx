import React, { useState, useCallback } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { colors, spacing } from '@/src/theme';

interface ImageCarouselProps {
  images: string[];
}

const { width } = Dimensions.get('window');

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  
  const handleScroll = useCallback((event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setActiveIndex(Math.round(index));
  }, []);
  
  const renderItem = useCallback(({ item }: { item: string }) => (
    <Image 
      source={{ uri: item }} 
      style={styles.image} 
      resizeMode="cover"
    />
  ), []);
  
  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item: string, index: number) => index.toString()}
      />
      <View style={styles.pagination}>
        {images.map((_: string, index: number) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dot,
              index === activeIndex ? styles.activeDot : styles.inactiveDot
            ]}
            onPress={() => {}}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: width,
    height: width,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: spacing.md,
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.primary,
  },
  inactiveDot: {
    backgroundColor: colors.text.secondary,
  },
});
