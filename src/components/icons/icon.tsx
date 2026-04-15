import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { ICON_PATHS, type IconName } from './paths';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, color = '#000' }) => {
  const pathData = ICON_PATHS[name];
  
  if (!pathData) {
    console.warn('Icon not found: ' + name);
    return null;
  }

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
        <Path 
          d={pathData} 
          stroke={color} 
          strokeWidth={2} 
          strokeLinecap='round' 
          strokeLinejoin='round' 
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});