import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type IconButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  color?: string;
  size?: number;
};

export function IconButton({ icon, onPress, color = colors.text, size = 24 }: IconButtonProps) {
  return (
    <Pressable onPress={onPress} style={{ padding: 8 }}>
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
}