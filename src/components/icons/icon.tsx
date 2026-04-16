import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { ICON_PATHS } from './paths';

export interface IconProps {
  name: keyof typeof ICON_PATHS;
  size?: number;
  color?: string;
}

export function Icon({ name, size = 24, color = '#000000' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path fill={color} d={ICON_PATHS[name]} />
    </Svg>
  );
}
