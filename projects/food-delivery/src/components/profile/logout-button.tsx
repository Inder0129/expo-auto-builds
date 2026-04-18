import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '@/src/theme';
import { Button } from '@/src/components/ui/button';

export interface LogoutButtonProps {
  onPress: () => void;
  style?: any;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onPress, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Button 
        title="Logout" 
        variant="outline" 
        onPress={onPress}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  button: {
    borderColor: colors.error,
  },
});
