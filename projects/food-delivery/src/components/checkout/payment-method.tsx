import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';
import { Card } from '@/src/components/ui/card';

type PaymentMethodType = 'card' | 'cash' | 'upi';

interface PaymentMethodProps {
  selectedMethod: PaymentMethodType;
  onSelect: (method: PaymentMethodType) => void;
}

export const PaymentMethod: React.FC<PaymentMethodProps> = (props: PaymentMethodProps) => {
  const { selectedMethod, onSelect } = props;
  
  const methods: { id: PaymentMethodType; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { id: 'card', label: 'Credit/Debit Card', icon: 'card' },
    { id: 'upi', label: 'UPI', icon: 'phone-portrait' },
    { id: 'cash', label: 'Cash on Delivery', icon: 'cash' },
  ];
  
  const handleSelect = useCallback((method: PaymentMethodType) => {
    onSelect(method);
  }, [onSelect]);
  
  return (
    <View>
      {methods.map((method) => (
        <TouchableOpacity
          key={method.id}
          onPress={() => handleSelect(method.id)}
          activeOpacity={0.7}
        >
          <Card
            style={{
              marginBottom: spacing.sm,
              borderWidth: 2,
              borderColor: selectedMethod === method.id ? colors.primary : colors.border,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name={method.icon} size={24} color={colors.text.primary} style={{ marginRight: spacing.md }} />
              <Text style={typography.body}>{method.label}</Text>
              <View style={{ flex: 1 }} />
              {selectedMethod === method.id && (
                <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
              )}
            </View>
          </Card>
        </TouchableOpacity>
      ))}
    </View>
  );
};
