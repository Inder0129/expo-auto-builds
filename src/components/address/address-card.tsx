import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';

interface AddressCardProps {
  address: {
    id: string;
    title: string;
    address: string;
    isDefault: boolean;
    type: 'home' | 'work' | 'other';
  };
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
  style?: ViewStyle;
}

const AddressCard: React.FC<AddressCardProps> = ({ address, onEdit, onDelete, onSetDefault, style }) => {
  const getIconName = (): keyof typeof Ionicons.glyphMap => {
    switch (address.type) {
      case 'home': return 'home';
      case 'work': return 'briefcase';
      case 'other': return 'location';
      default: return 'location';
    }
  };

  const getIconColor = (): string => {
    switch (address.type) {
      case 'home': return colors.primary;
      case 'work': return colors.secondary;
      case 'other': return colors.textSecondary;
      default: return colors.textSecondary;
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Ionicons name={getIconName()} size={20} color={getIconColor()} />
          <Text style={styles.title}>{address.title}</Text>
          {address.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultText}>Default</Text>
            </View>
          )}
        </View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
            <Ionicons name="create-outline" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
            <Ionicons name="trash-outline" size={20} color={colors.error} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.address}>{address.address}</Text>

      {!address.isDefault && (
        <TouchableOpacity style={styles.setDefaultButton} onPress={onSetDefault}>
          <Text style={styles.setDefaultText}>Set as Default</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginLeft: 8,
    marginRight: 8
  },
  defaultBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4
  },
  defaultText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500'
  },
  actions: {
    flexDirection: 'row'
  },
  actionButton: {
    marginLeft: 12
  },
  address: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12
  },
  setDefaultButton: {
    alignSelf: 'flex-start'
  },
  setDefaultText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500'
  }
});

export default AddressCard;