import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '@/src/theme';

interface PaymentMethodType {
  id: string;
  name: string;
  type: 'card' | 'upi' | 'cash';
  lastFour?: string;
}

interface PaymentMethodProps {
  paymentMethods: PaymentMethodType[];
  selectedPayment: string;
  onSelectPayment: (paymentId: string) => void;
  style?: ViewStyle;
}

export const PaymentMethod: React.FC<PaymentMethodProps> = (props: PaymentMethodProps) => {
  const { paymentMethods, selectedPayment, onSelectPayment, style } = props;

  const getIcon = (type: string) => {
    switch (type) {
      case 'card': return '💳';
      case 'upi': return '📱';
      case 'cash': return '💵';
      default: return '💳';
    }
  };

  return (
    <View style={style}>
      {paymentMethods.map((method: PaymentMethodType) => (
        <TouchableOpacity
          key={method.id}
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              padding: 16,
              borderWidth: 2,
              borderColor: colors.border,
              borderRadius: 8,
              marginBottom: 12,
              backgroundColor: colors.surface,
            },
            selectedPayment === method.id && {
              borderColor: colors.primary,
              backgroundColor: colors.primary + '10',
            },
          ]}
          onPress={() => onSelectPayment(method.id)}
        >
          <Text style={{ fontSize: 24, marginRight: 16 }}>{getIcon(method.type)}</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text.primary }}>
              {method.name}
            </Text>
            {method.lastFour && (
              <Text style={{ fontSize: 14, color: colors.text.secondary, marginTop: 2 }}>
                **** **** **** {method.lastFour}
              </Text>
            )}
          </View>
          <View style={[
            {
              width: 20,
              height: 20,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: colors.border,
              justifyContent: 'center',
              alignItems: 'center',
            },
            selectedPayment === method.id && {
              borderColor: colors.primary,
            },
          ]}>
            {selectedPayment === method.id && (
              <View style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: colors.primary,
              }} />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
