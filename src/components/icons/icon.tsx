import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { iconPaths } from './paths';

type IconProps = {
  name: keyof typeof iconPaths;
  color?: string;
  size?: number;
};

export const Icon: React.FC<IconProps> = ({ name, color = '#000000', size = 24 }) => {
  const path = iconPaths[name];
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d={path} fill={color} />
    </Svg>
  );
};

export const CalculatorIcon = (props: Omit<IconProps, 'name'>) => <Icon name="calculator" {...props} />;
export const HistoryIcon = (props: Omit<IconProps, 'name'>) => <Icon name="history" {...props} />;
export const SettingsIcon = (props: Omit<IconProps, 'name'>) => <Icon name="settings" {...props} />;
export const BackIcon = (props: Omit<IconProps, 'name'>) => <Icon name="back" {...props} />;
export const ClearIcon = (props: Omit<IconProps, 'name'>) => <Icon name="clear" {...props} />;
export const EqualsIcon = (props: Omit<IconProps, 'name'>) => <Icon name="equals" {...props} />;
export const PlusIcon = (props: Omit<IconProps, 'name'>) => <Icon name="plus" {...props} />;
export const MinusIcon = (props: Omit<IconProps, 'name'>) => <Icon name="minus" {...props} />;
export const MultiplyIcon = (props: Omit<IconProps, 'name'>) => <Icon name="multiply" {...props} />;
export const DivideIcon = (props: Omit<IconProps, 'name'>) => <Icon name="divide" {...props} />;