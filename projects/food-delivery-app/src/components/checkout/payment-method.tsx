import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';

type PaymentMethodType = 'card' | 'cash' | 'upi';

interface PaymentMethodProps {
  selectedMethod: PaymentMethodType;
  onSelect: (method: PaymentMethodType) => void;
  style?: ViewStyle;
}

export const PaymentMethod: React.FC<PaymentMethodProps> = (props) => {
  const { selectedMethod, onSelect, style } = props;
  
  const methods: { type: PaymentMethodType; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { type: 'card', label: 'Credit/Debit Card', icon: 'card' },
    { type: 'upi', label: 'UPI', icon: 'phone-portrait' },
    { type: 'cash', label: 'Cash on Delivery', icon: 'cash' },
  ];
  
  const handleSelect = useCallback((method: PaymentMethodType) => {
    onSelect(method);
  }, [onSelect]);
  
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.sectionTitle}>Payment Method</Text>
      
      {methods.map((method) => (
        <TouchableOpacity 
          key={method.type}
          style={[
            styles.methodCard,
            selectedMethod === method.type && styles.selectedCard,
          ]}
          onPress={() => handleSelect(method.type)}
        >
          <View style={styles.methodContent}>
            <Ionicons 
              name={method.icon} 
              size={24} 
              color={selectedMethod === method.type ? colors.primary : colors.text.secondary} 
            />
            <Text style={[
              styles.methodLabel,
              selectedMethod === method.type && styles.selectedLabel,
            ]}>
              {method.label}
            </Text>
          </View>
          
          <View style={styles.radioContainer}>
            <View style={[
              styles.radioOuter,
              selectedMethod === method.type && styles.radioOuterSelected,
            ]}>
              {selectedMethod === method.type && (
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
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  methodCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedCard: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  methodContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodLabel: {
    fontSize: 16,
    color: colors.text.secondary,
    marginLeft: 12,
  },
  selectedLabel: {
    color: colors.primary,
    fontWeight: '500',
  },
  radioContainer: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
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
