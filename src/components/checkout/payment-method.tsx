import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

interface PaymentMethodType {
  id: string;
  name: string;
  icon: string;
}

interface PaymentMethodProps {
  methods: PaymentMethodType[];
  selectedMethod: string;
  onSelectMethod: (methodId: string) => void;
  style?: any;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  methods,
  selectedMethod,
  onSelectMethod,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {methods.map((method: PaymentMethodType) => (
        <TouchableOpacity
          key={method.id}
          style={[
            styles.methodItem,
            selectedMethod === method.id && styles.selectedMethod,
          ]}
          onPress={() => onSelectMethod(method.id)}
          activeOpacity={0.7}
        >
          <View style={styles.methodContent}>
            <Ionicons 
              name={method.icon as any} 
              size={24} 
              color={selectedMethod === method.id ? colors.primary.main : colors.text.primary} 
            />
            <Text style={[
              styles.methodName,
              selectedMethod === method.id && styles.selectedMethodName,
            ]}>
              {method.name}
            </Text>
          </View>
          
          <View style={[
            styles.radioOuter,
            selectedMethod === method.id && styles.radioOuterSelected,
          ]}>
            {selectedMethod === method.id && (
              <View style={styles.radioInner} />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 8,
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  selectedMethod: {
    backgroundColor: colors.primary.light + '20',
  },
  methodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  methodName: {
    ...typography.body,
    color: colors.text.primary,
    marginLeft: spacing.sm,
  },
  selectedMethodName: {
    color: colors.primary.main,
    fontWeight: '600',
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
    borderColor: colors.primary.main,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary.main,
  },
});

export { PaymentMethod };