import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

interface PaymentMethodType {
  id: string;
  name: string;
  type: 'card' | 'cash' | 'digital';
  lastFour?: string;
}

interface PaymentMethodProps {
  paymentMethods: PaymentMethodType[];
  selectedMethodId: string;
  onSelectMethod: (methodId: string) => void;
}

export const PaymentMethod: React.FC<PaymentMethodProps> = (props: PaymentMethodProps) => {
  const getMethodIcon = (type: string) => {
    switch (type) {
      case 'card': return '💳';
      case 'cash': return '💵';
      case 'digital': return '📱';
      default: return '💳';
    }
  };
  
  return (
    <View style={styles.container}>
      {props.paymentMethods.map((method: PaymentMethodType) => (
        <TouchableOpacity
          key={method.id}
          style={[
            styles.methodCard,
            props.selectedMethodId === method.id && styles.methodCardSelected
          ]}
          onPress={() => props.onSelectMethod(method.id)}
        >
          <View style={styles.methodHeader}>
            <Text style={styles.methodIcon}>{getMethodIcon(method.type)}</Text>
            <View style={styles.methodInfo}>
              <Text style={styles.methodName}>{method.name}</Text>
              {method.lastFour && (
                <Text style={styles.methodDetails}>•••• {method.lastFour}</Text>
              )}
            </View>
          </View>
          
          {props.selectedMethodId === method.id && (
            <View style={styles.selectedIndicator}>
              <Text style={styles.selectedIndicatorText}>✓ Selected</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add New Payment Method</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm
  },
  methodCard: {
    padding: spacing.md,
    backgroundColor: colors.background,
    borderRadius: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border
  },
  methodCardSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary
  },
  methodHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  methodIcon: {
    fontSize: 24,
    marginRight: spacing.md
  },
  methodInfo: {
    flex: 1
  },
  methodName: {
    ...typography.bodyLarge,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: spacing.xs
  },
  methodDetails: {
    ...typography.bodySmall,
    color: colors.textSecondary
  },
  selectedIndicator: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  selectedIndicatorText: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '600'
  },
  addButton: {
    padding: spacing.md,
    backgroundColor: colors.background,
    borderRadius: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    alignItems: 'center'
  },
  addButtonText: {
    ...typography.body,
    color: colors.primary
  }
});