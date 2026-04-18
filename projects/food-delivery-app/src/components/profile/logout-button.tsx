import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '@/src/theme';
import { Button } from '@/src/components/ui/button';

interface Props {
  onPress: () => void;
  style?: any;
}

export const LogoutButton: React.FC<Props> = ({ onPress, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Button title="Logout" variant="danger" onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
});
