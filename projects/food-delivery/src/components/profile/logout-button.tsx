import React, { useCallback } from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppDispatch } from '@/src/store/hooks';
import { colors, spacing, typography } from '@/src/theme';

interface Props {
  onPress?: () => void;
  style?: any;
}

export const LogoutButton: React.FC<Props> = ({ onPress, style }) => {
  const dispatch = useAppDispatch();

  const handlePress = useCallback(() => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            // Dispatch logout action
            onPress?.();
          }
        },
      ]
    );
  }, [dispatch, onPress]);

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={handlePress}>
      <MaterialCommunityIcons name="logout" size={24} color={colors.error} />
      <Text style={styles.text}>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: spacing.md,
  },
  text: {
    ...typography.bodyBold,
    color: colors.error,
    marginLeft: spacing.md,
  },
});
