import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/src/components/ui/button';
import { colors } from '@/src/theme/colors';
import { typography } from '@/src/theme/typography';
import { spacing } from '@/src/theme/spacing';

interface EmptyAddressesProps {
  onAddAddress: () => void;
  style?: ViewStyle;
}

export const EmptyAddresses: React.FC<EmptyAddressesProps> = (props: EmptyAddressesProps) => {
  const { onAddAddress, style } = props;

  const handleAddAddress = useCallback(() => {
    onAddAddress?.();
  }, [onAddAddress]);

  return (
    <View style={[styles.container, style]}>
      <Ionicons name="location-outline" size={64} color={colors.text.secondary} />
      <Text style={styles.title}>No Addresses Yet</Text>
      <Text style={styles.subtitle}>Add your first delivery address to get started</Text>
      <Button
        title="Add Address"
        onPress={handleAddAddress}
        variant="primary"
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  button: {
    width: '100%',
  },
});
