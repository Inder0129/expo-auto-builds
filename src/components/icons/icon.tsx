import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { ICON_PATHS } from './paths';

interface IconProps {
  name: keyof typeof ICON_PATHS;
  size: number;
  color: string;
}

const Icon: React.FC<IconProps> = ({ name, size, color }) => {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size}>
      <Path d={ICON_PATHS[name]} stroke={color} strokeWidth={2} />
    </Svg>
  );
};

export default Icon;