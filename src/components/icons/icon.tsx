import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { PATHS } from './paths';

type IconProps = {
  name: keyof typeof PATHS;
  color?: string;
  size?: number;
};

export const Icon: React.FC<IconProps> = ({ name, color = '#000000', size = 24 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d={PATHS[name]}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};