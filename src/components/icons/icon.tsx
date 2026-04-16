import React from 'react';
import { Svg, Path, SvgProps } from 'react-native-svg';
import * as paths from './paths';

type IconProps = SvgProps & {
  name: keyof typeof paths;
  size?: number;
};

export function Icon({ name, size = 24, ...props }: IconProps) {
  const path = paths[name];
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <Path d={path} fill="currentColor" />
    </Svg>
  );
}
