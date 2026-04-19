import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import { Photo } from '@/src/types';
import { colors } from '@/src/theme';

interface Props {
  photo: Photo;
  style?: any;
}

const { width } = Dimensions.get('window');

export const PhotoViewer: React.FC<Props> = ({ photo, style }) => {
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
