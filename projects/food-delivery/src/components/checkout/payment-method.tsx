import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

interface PaymentMethodType {
  id: string;
  name: string;
  icon: string;
  isDefault: boolean;
}

interface PaymentMethodProps {
  methods: PaymentMethodType[];
  selectedMethodId: string;
  onSelectMethod: (methodId: string) => void;
  style?: ViewStyle;
}

export const PaymentMethod: React.FC<PaymentMethodProps> = (props: PaymentMethodProps) => {
  return (
    <View style={[styles.container, props.style]}>
      {props.methods.map((method: PaymentMethodType) => (
        <TouchableOpacity
          key={method.id}
          style={[
            styles.methodCard,
            props.selectedMethodId === method.id && styles.methodCardSelected,
          ]}
          onPress={() => props.onSelectMethod(method.id)}
        >
          <View style={styles.methodInfo}>
            <Ionicons name={method.icon as any} size={24} color={colors.primary} />
            <Text style={styles.methodName}>{method.name}</Text>
          </View>
          <View style={styles.radioContainer}>
            <View style={[
              styles.radioOuter,
              props.selectedMethodId === method.id && styles.radioOuterSelected,
            ]}>
              {props.selectedMethodId === method.id && (
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
    gap: spacing.md,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  methodCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodName: {
    ...typography.body,
    color: colors.textPrimary,
    marginLeft: spacing.md,
  },
  radioContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
});
