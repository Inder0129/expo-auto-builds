import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type WrapperViewProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export function WrapperView({ children, style }: WrapperViewProps) {
  return <View style={[styles.wrapper, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
});