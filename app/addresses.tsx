import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/src/styles/addresses';
import { colors } from '@/src/theme';

interface Address {
  id: string;
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
}

type AddressFormData = Omit<Address, 'id' | 'isDefault'>;

export default function AddressesScreen() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'John Doe',
      addressLine1: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      phone: '+1 (555) 123-4567',
      isDefault: true,
    },
    {
      id: '2',
      name: 'Jane Smith',
      addressLine1: '456 Oak Avenue',
      addressLine2: 'Apt 3B',
      city: 'Brooklyn',
      state: 'NY',
      zipCode: '11201',
      phone: '+1 (555) 987-6543',
      isDefault: false,
    },
  ]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState<AddressFormData>({
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });

  const handleAddAddress = useCallback(() => {
    setEditingAddress(null);
    setFormData({
      name: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
    });
    setModalVisible(true);
  }, []);

  const handleEditAddress = useCallback((address: Address) => {
    setEditingAddress(address);
    setFormData({
      name: address.name,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || '',
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      phone: address.phone,
    });
    setModalVisible(true);
  }, []);

  const handleDeleteAddress = useCallback((id: string) => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setAddresses((prev) => prev.filter((addr) => addr.id !== id));
          },
        },
      ]
    );
  }, []);

  const handleSetDefault = useCallback((id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  }, []);

  const handleSaveAddress = useCallback(() => {
    if (!formData.name.trim() || !formData.addressLine1.trim() || !formData.city.trim() || !formData.state.trim() || !formData.zipCode.trim() || !formData.phone.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (editingAddress) {
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingAddress.id
            ? { ...formData, id: editingAddress.id, isDefault: editingAddress.isDefault }
            : addr
        )
      );
    } else {
      const newAddress: Address = {
        ...formData,
        id: Date.now().toString(),
        isDefault: addresses.length === 0,
      };
      setAddresses((prev) => [...prev, newAddress]);
    }
    setModalVisible(false);
  }, [formData, editingAddress, addresses.length]);

  const renderAddressItem = useCallback(
    ({ item }: { item: Address }) => (
      <View style={styles.addressCard}>
        <View style={styles.addressHeader}>
          <Text style={styles.addressName}>{item.name}</Text>
          {item.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultBadgeText}>Default</Text>
            </View>
          )}
        </View>
        <Text style={styles.addressText}>{item.addressLine1}</Text>
        {item.addressLine2 && <Text style={styles.addressText}>{item.addressLine2}</Text>}
        <Text style={styles.addressText}>
          {item.city}, {item.state} {item.zipCode}
        </Text>
        <Text style={styles.addressText}>{item.phone}</Text>
        <View style={styles.addressActions}>
          <TouchableOpacity onPress={() => handleEditAddress(item)} style={styles.actionButton}>
            <Ionicons name="pencil" size={20} color={colors.primary} />
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteAddress(item.id)} style={styles.actionButton}>
            <Ionicons name="trash" size={20} color={colors.error} />
            <Text style={[styles.actionText, { color: colors.error }]}>Delete</Text>
          </TouchableOpacity>
          {!item.isDefault && (
            <TouchableOpacity onPress={() => handleSetDefault(item.id)} style={styles.actionButton}>
              <Ionicons name="star" size={20} color={colors.warning} />
              <Text style={[styles.actionText, { color: colors.warning }]}>Set Default</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    ),
    [handleEditAddress, handleDeleteAddress, handleSetDefault]
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Addresses</Text>
        <View style={styles.headerRight} />
      </View>

      <FlatList
        data={addresses}
        renderItem={renderAddressItem}
        keyExtractor={(item: Address) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={(
          <View style={styles.emptyContainer}>
            <Ionicons name="location-outline" size={64} color={colors.gray} />
            <Text style={styles.emptyText}>No addresses saved yet</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
        <Ionicons name="add" size={24} color={colors.white} />
        <Text style={styles.addButtonText}>Add New Address</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{editingAddress ? 'Edit Address' : 'Add New Address'}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <TextInput
                style={styles.input}
                placeholder="Full Name *"
                value={formData.name}
                onChangeText={(text: string) => setFormData((prev) => ({ ...prev, name: text }))}
                placeholderTextColor={colors.gray}
              />
              <TextInput
                style={styles.input}
                placeholder="Address Line 1 *"
                value={formData.addressLine1}
                onChangeText={(text: string) => setFormData((prev) => ({ ...prev, addressLine1: text }))}
                placeholderTextColor={colors.gray}
              />
              <TextInput
                style={styles.input}
                placeholder="Address Line 2 (Optional)"
                value={formData.addressLine2}
                onChangeText={(text: string) => setFormData((prev) => ({ ...prev, addressLine2: text }))}
                placeholderTextColor={colors.gray}
              />
              <View style={styles.rowInputs}>
                <TextInput
                  style={[styles.input, styles.flexInput]}
                  placeholder="City *"
                  value={formData.city}
                  onChangeText={(text: string) => setFormData((prev) => ({ ...prev, city: text }))}
                  placeholderTextColor={colors.gray}
                />
                <TextInput
                  style={[styles.input, styles.flexInput]}
                  placeholder="State *"
                  value={formData.state}
                  onChangeText={(text: string) => setFormData((prev) => ({ ...prev, state: text }))}
                  placeholderTextColor={colors.gray}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder="ZIP Code *"
                value={formData.zipCode}
                onChangeText={(text: string) => setFormData((prev) => ({ ...prev, zipCode: text }))}
                placeholderTextColor={colors.gray}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number *"
                value={formData.phone}
                onChangeText={(text: string) => setFormData((prev) => ({ ...prev, phone: text }))}
                placeholderTextColor={colors.gray}
                keyboardType="phone-pad"
              />
            </ScrollView>
            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
                <Text style={styles.saveButtonText}>Save Address</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
