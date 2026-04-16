import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { iconPaths } from './paths';

type IconProps = {
  name: keyof typeof iconPaths;
  color?: string;
  size?: number;
};

export const Icon: React.FC<IconProps> = ({ name, color = '#000000', size = 24 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d={iconPaths[name]} fill={color} />
    </Svg>
  );
};

export const CalculatorIcon = (props: Omit<IconProps, 'name'>) => (
  <Icon name="calculator" {...props} />
);
export const HistoryIcon = (props: Omit<IconProps, 'name'>) => (
  <Icon name="history" {...props} />
);
export const SettingsIcon = (props: Omit<IconProps, 'name'>) => (
  <Icon name="settings" {...props} />
);
export const BackIcon = (props: Omit<IconProps, 'name'>) => (
  <Icon name="back" {...props} />
);
export const DeleteIcon = (props: Omit<IconProps, 'name'>) => (
  <Icon name="delete" {...props} />
);
export const CopyIcon = (props: Omit<IconProps, 'name'>) => (
  <Icon name="copy" {...props} />
);
export const ThemeIcon = (props: Omit<IconProps, 'name'>) => (
  <Icon name="theme" {...props} />
);
export const FormatIcon = (props: Omit<IconProps, 'name'>) => (
  <Icon name="format" {...props} />
);