import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

interface PaymentMethodSelectorProps {
  selectedMethod: 'card' | 'upi' | 'cash';
  onSelect: (method: 'card' | 'upi' | 'cash') => void;
  style?: any;
}

export function PaymentMethodSelector(props: PaymentMethodSelectorProps) {
  const { selectedMethod, onSelect, style } = props;

  const paymentMethods = [
    { id: 'card' as const, label: 'Credit/Debit Card', icon: 'card-outline' as const },
    { id: 'upi' as const, label: 'UPI', icon: 'phone-portrait-outline' as const },
    { id: 'cash' as const, label: 'Cash on Delivery', icon: 'cash-outline' as const }
  ];

  const handleSelect = useCallback((method: 'card' | 'upi' | 'cash'): void => {
    onSelect(method);
  }, [onSelect]);

  return (
    <View style={[styles.container, style]}>
      {paymentMethods.map((method) => (
        <TouchableOpacity
          key={method.id}
          style={[
            styles.methodItem,
            selectedMethod === method.id && styles.selectedMethod
          ]}
          onPress={() => handleSelect(method.id)}
          activeOpacity={0.7}
        >
          <View style={styles.methodContent}>
            <Ionicons
              name={method.icon}
              size={24}
              color={selectedMethod === method.id ? colors.primary : colors.text.secondary}
            />
            <Text style={[
              styles.methodLabel,
              selectedMethod === method.id && styles.selectedMethodLabel
            ]}>
              {method.label}
            </Text>
          </View>
          <View style={[
            styles.radioOuter,
            selectedMethod === method.id && styles.radioOuterSelected
          ]}>
            {selectedMethod === method.id && (
              <View style={styles.radioInner} />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border
  },
  selectedMethod: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10'
  },
  methodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md
  },
  methodLabel: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.secondary
  },
  selectedMethodLabel: {
    color: colors.primary,
    fontFamily: typography.fontFamily.semiBold
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center'
  },
  radioOuterSelected: {
    borderColor: colors.primary
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary
  }
});
