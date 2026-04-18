import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { spacing } from '@/src/theme';
import { typography } from '@/src/theme';
import { Button } from '@/src/components/ui';

type AddressData = {
  name: string;
  address: string;
  city: string;
  zipCode: string;
  isDefault: boolean;
};

interface Props {
  visible: boolean;
  address: AddressData | null;
  onSave: (address: AddressData) => void;
  onClose: () => void;
}

export const EditAddressModal: React.FC<Props> = ({ visible, address, onSave, onClose }) => {
  const [formData, setFormData] = useState<AddressData>({
    name: '',
    address: '',
    city: '',
    zipCode: '',
    isDefault: false,
  });

  useEffect(() => {
    if (address) {
      setFormData(address);
    } else {
      setFormData({
        name: '',
        address: '',
        city: '',
        zipCode: '',
        isDefault: false,
      });
    }
  }, [address]);

  const handleInputChange = useCallback((field: keyof AddressData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = useCallback(() => {
    if (!formData.name || !formData.address || !formData.city || !formData.zipCode) {
      alert('Please fill all fields');
      return;
    }
    onSave(formData);
  }, [formData, onSave]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {address ? 'Edit Address' : 'Add New Address'}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.text.primary} />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <TextInput
              style={styles.input}
              placeholder="Address Name (e.g., Home, Work)"
              value={formData.name}
              onChangeText={(text: string) => handleInputChange('name', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Street Address"
              value={formData.address}
              onChangeText={(text: string) => handleInputChange('address', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="City, State"
              value={formData.city}
              onChangeText={(text: string) => handleInputChange('city', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="ZIP Code"
              value={formData.zipCode}
              onChangeText={(text: string) => handleInputChange('zipCode', text)}
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => handleInputChange('isDefault', !formData.isDefault)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, formData.isDefault && styles.checkboxChecked]}>
                {formData.isDefault && (
                  <Ionicons name="checkmark" size={16} color={colors.white} />
                )}
              </View>
              <Text style={styles.checkboxLabel}>Set as default address</Text>
            </TouchableOpacity>
          </ScrollView>
          <View style={styles.footer}>
            <Button
              title="Cancel"
              onPress={onClose}
              variant="outline"
              style={styles.cancelButton}
            />
            <Button
              title={address ? 'Update' : 'Save'}
              onPress={handleSave}
              style={styles.saveButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.primary,
    marginRight: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
  },
  checkboxLabel: {
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
  },
  footer: {
    flexDirection: 'row',
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.md,
  },
  cancelButton: {
    flex: 1,
  },
  saveButton: {
    flex: 1,
  },
});
