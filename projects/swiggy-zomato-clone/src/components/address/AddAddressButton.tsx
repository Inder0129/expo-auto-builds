import React from 'react';
import { View } from 'react-native';
import { Button } from '@/src/components/ui/Button';
import { styles } from '@/src/styles/address';

type AddAddressButtonProps = {
  onPress: () => void;
};

export function AddAddressButton({ onPress }: AddAddressButtonProps) {
  return (
    <View style={styles.addButtonContainer}>
      <Button
        title="Add New Address"
        onPress={onPress}
        style={styles.addButton}
      />
    </View>
  );
}
