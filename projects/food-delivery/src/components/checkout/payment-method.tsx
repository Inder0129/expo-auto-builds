import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

export interface PaymentMethodProps {
  methods: {
    id: string;
    type: 'card' | 'cash' | 'wallet';
    lastFour?: string;
    name: string;
    isDefault: boolean;
  }[];
  selectedMethod: string;
  onSelect: (methodId: string) => void;
  style?: ViewStyle;
}

export const PaymentMethod: React.FC<PaymentMethodProps> = (props: PaymentMethodProps) => {
  const { methods, selectedMethod, onSelect, style } = props;
  
  const getIconName = (type: string) => {
    switch (type) {
      case 'card': return 'card';
      case 'cash': return 'cash';
      case 'wallet': return 'wallet';
      default: return 'card';
    }
  };
  
  return (
    <View style={[styles.container, style]}>
      {methods.map((method) => (
        <TouchableOpacity
          key={method.id}
          style={[
            styles.methodCard,
            selectedMethod === method.id && styles.methodCardSelected,
          ]}
          onPress={() => onSelect(method.id)}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            <Ionicons 
              name={getIconName(method.type)} 
              size={24} 
              color={colors.primary} 
            />
          </View>
          <View style={styles.methodContent}>
            <View style={styles.methodHeader}>
              <Text style={styles.methodName}>{method.name}</Text>
              {method.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultText}>Default</Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.radioContainer}>
            <View style={[
              styles.radio,
              selectedMethod === method.id && styles.radioSelected,
            ]}>
              {selectedMethod === method.id && (
                <View style={styles.radioInner} />
              )}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  methodCardSelected: {
    borderColor: colors.primary,
  },
  iconContainer: {
    marginRight: spacing.md,
  },
  methodContent: {
    flex: 1,
  },
  methodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodName: {
    ...typography.bodyBold,
    color: colors.text.primary,
    marginRight: spacing.sm,
  },
  defaultBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultText: {
    ...typography.caption,
    color: colors.primary,
  },
  radioContainer: {
    marginLeft: spacing.sm,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
});
