import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';
import styles from './address-card.styles';

interface Props {
  name: string;
  address: string;
  isDefault: boolean;
  onPress: () => void;
}

export const AddressCard: React.FC<Props> = ({ name, address, isDefault, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Ionicons name="location-outline" size={20} color={colors.primary} />
        <Text style={styles.name}>{name}</Text>
        {isDefault && (
          <View style={styles.defaultBadge}>
            <Text style={styles.defaultText}>Default</Text>
          </View>
        )}
      </View>
      <Text style={styles.address}>{address}</Text>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.editButton} onPress={onPress}>
          <Ionicons name="create-outline" size={16} color={colors.primary} />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
