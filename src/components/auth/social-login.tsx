import React, { useCallback } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme/colors';
import { typography } from '@/src/theme/typography';
import { spacing } from '@/src/theme/spacing';

interface SocialLoginProps {
  onProviderSelect: (provider: string) => void;
  style?: ViewStyle;
}

export const SocialLogin: React.FC<SocialLoginProps> = (props: SocialLoginProps) => {
  const { onProviderSelect, style } = props;

  const handleGoogle = useCallback(() => {
    onProviderSelect?.('google');
  }, [onProviderSelect]);

  const handleFacebook = useCallback(() => {
    onProviderSelect?.('facebook');
  }, [onProviderSelect]);

  const handleApple = useCallback(() => {
    onProviderSelect?.('apple');
  }, [onProviderSelect]);

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={handleGoogle} style={styles.button}>
        <Ionicons name="logo-google" size={24} color={colors.error} />
        <Text style={styles.buttonText}>Google</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleFacebook} style={styles.button}>
        <Ionicons name="logo-facebook" size={24} color={colors.info} />
        <Text style={styles.buttonText}>Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleApple} style={styles.button}>
        <Ionicons name="logo-apple" size={24} color={colors.text.primary} />
        <Text style={styles.buttonText}>Apple</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: spacing.sm,
    marginHorizontal: spacing.xs,
  },
  buttonText: {
    ...typography.caption,
    color: colors.text.primary,
    marginLeft: spacing.xs,
  },
});
