import React from 'react';
import Svg, { Path } from 'react-native-svg';
import * as paths from './paths';

type IconProps = {
  name: keyof typeof paths;
  color?: string;
  size?: number;
};

export const Icon: React.FC<IconProps> = ({ name, color = '#000000', size = 24 }) => {
  const pathData = paths[`${name}IconPath` as keyof typeof paths];
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path fill={color} d={pathData} />
    </Svg>
  );
};