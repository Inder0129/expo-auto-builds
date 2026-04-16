import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { iconPaths } from './paths';

interface IconProps {
  name: keyof typeof iconPaths;
  size?: number;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, color = '#000000' }) => {
  const path = iconPaths[name];
  
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d={path} fill={color} />
    </Svg>
  );
};