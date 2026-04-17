import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { colors, spacing, typography } from '@/src/theme';

type TermsAgreementProps = {
  accepted: boolean;
  onToggle: () => void;
};

export function TermsAgreement({ accepted, onToggle }: TermsAgreementProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.lg }}>
      <TouchableOpacity onPress={onToggle}>
        <Ionicons
          name={accepted ? 'checkbox' : 'square-outline'}
          size={24}
          color={accepted ? colors.primary : colors.textSecondary}
        />
      </TouchableOpacity>
      
      <Text style={[typography.small, { marginLeft: spacing.sm, flex: 1 }]}>
        I agree to the{' '}
        <Link href="/terms" style={{ color: colors.primary }}>
          Terms of Service
        </Link>
        {' '}and{' '}
        <Link href="/privacy" style={{ color: colors.primary }}>
          Privacy Policy
        </Link>
      </Text>
    </View>
  );
}
