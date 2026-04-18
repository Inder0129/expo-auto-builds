import React, { useCallback } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

interface AddressFormProps {
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  };
  onAddressChange: (field: keyof AddressFormProps['address'], value: string) => void;
  style?: any;
}

export function AddressForm(props: AddressFormProps) {
  const { address, onAddressChange, style } = props;

  const handleChange = useCallback((field: keyof AddressFormProps['address']) => {
    return (value: string): void => {
      onAddressChange(field, value);
    };
  }, [onAddressChange]);

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.input}
        placeholder="Street Address"
        value={address.street}
        onChangeText={handleChange('street')}
        placeholderTextColor={colors.text.tertiary}
      />
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="City"
          value={address.city}
          onChangeText={handleChange('city')}
          placeholderTextColor={colors.text.tertiary}
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="State"
          value={address.state}
          onChangeText={handleChange('state')}
          placeholderTextColor={colors.text.tertiary}
        />
      </View>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="ZIP Code"
          value={address.zipCode}
          onChangeText={handleChange('zipCode')}
          placeholderTextColor={colors.text.tertiary}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Phone Number"
          value={address.phone}
          onChangeText={handleChange('phone')}
          placeholderTextColor={colors.text.tertiary}
          keyboardType="phone-pad"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: spacing.sm,
    padding: spacing.md,
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.border
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md
  },
  halfInput: {
    flex: 1
  }
});
