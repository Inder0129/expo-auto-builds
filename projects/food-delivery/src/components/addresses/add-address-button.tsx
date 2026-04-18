import React, { useCallback } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme/colors';
import { typography } from '@/src/theme/typography';
import { spacing } from '@/src/theme/spacing';

interface AddAddressButtonProps {
  onPress: () => void;
  style?: any;
}

export const AddAddressButton: React.FC<AddAddressButtonProps> = ({ onPress, style }) => {
  const handlePress = useCallback(() => {
    onPress();
  }, [onPress]);

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
        <Text style={styles.text}>Add New Address</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: spacing.md,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: spacing.md,
  },
  text: {
    ...typography.button,
    color: colors.onPrimary,
    marginLeft: spacing.sm,
  },
});
