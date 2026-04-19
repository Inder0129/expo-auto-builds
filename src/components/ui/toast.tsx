import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  style?: ViewStyle;
}

export function Toast(props: ToastProps) {
  const type = props.type || 'info';

  const typeStyles: Record<string, ViewStyle> = {
    success: {
      backgroundColor: colors.success,
    },
    error: {
      backgroundColor: colors.error,
    },
    warning: {
      backgroundColor: colors.warning,
    },
    info: {
      backgroundColor: colors.primary,
    },
  };

  return (
    <View style={[styles.container, typeStyles[type], props.style]}>
      <Text style={styles.message}>{props.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    ...typography.body,
    color: '#FFFFFF',
  },
});