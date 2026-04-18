import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '@/src/theme';

export const OfferTerms: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Terms & Conditions</Text>
      <Text style={styles.text}>
        • Offers are valid for a limited time only{'
'}
        • Cannot be combined with other offers{'
'}
        • Restaurant may have additional terms{'
'}
        • FoodDelivery reserves the right to modify or cancel offers
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    marginTop: spacing.sm,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  text: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
