import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/src/theme';

interface IconButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  size?: number;
  color?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export function IconButton(props: IconButtonProps) {
  const size = props.size || 24;
  const color = props.color || colors.text;
  const disabled = props.disabled || false;

  return (
    <TouchableOpacity
      style={[styles.button, props.style]}
      onPress={props.onPress}
      disabled={disabled}
    >
      <Ionicons name={props.icon} size={size} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: spacing.small,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});