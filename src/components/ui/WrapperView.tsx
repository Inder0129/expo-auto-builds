import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

type WrapperViewProps = {
  children: React.ReactNode;
  style?: any;
};

export function WrapperView({ children, style }: WrapperViewProps) {
  return <View style={[styles.wrapper, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
});