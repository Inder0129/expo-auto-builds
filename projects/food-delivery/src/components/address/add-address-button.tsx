import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';

interface AddAddressButtonProps {
  onPress: () => void;
  style?: ViewStyle;
}

const AddAddressButton: React.FC<AddAddressButtonProps> = ({ onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
      <Text style={styles.text}>Add New Address</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 8
  }
});

export default AddAddressButton;