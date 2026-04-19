import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import { Photo, Filter, Adjustment } from '@/src/types';
import { colors } from '@/src/theme';

interface Props {
  photo: Photo;
  filter: Filter;
  adjustments: Adjustment;
  style?: any;
}

const { width } = Dimensions.get('window');

export const EditCanvas: React.FC<Props> = ({ photo, filter, adjustments, style }) => {
  // In a real app, you would apply the filter and adjustments to the image
  // This is a simplified version that just shows the original image
  
  return (
    <View style={[{
      width: '100%',
      height: width,
      backgroundColor: colors.background.secondary,
      justifyContent: 'center',
      alignItems: 'center'
    }, style]}>
      <Image 
        source={{ uri: photo.uri }}
        style={{
          width: '100%',
          height: '100%',
          resizeMode: 'contain'
        }}
      />
    </View>
  );
};
