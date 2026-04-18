import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';
import { Card } from '@/src/components/ui/card';
import styles from './address-card.styles';

type Address = {
  id: string;
  name: string;
  address: string;
  isDefault: boolean;
};

interface Props {
  address: Address;
  onPress: () => void;
}

export default function AddressCard({ address, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.container}>
        <View style={styles.header}>
          <View style={styles.nameContainer}>
            <Ionicons name="location-outline" size={16} color={colors.primary} />
            <Text style={styles.name}>{address.name}</Text>
            {address.isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultText}>Default</Text>
              </View>
            )}
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.textLight} />
        </View>
        <Text style={styles.address}>{address.address}</Text>
      </Card>
    </TouchableOpacity>
  );
}
