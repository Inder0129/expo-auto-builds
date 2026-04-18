import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { spacing } from '@/src/theme';
import { typography } from '@/src/theme';

interface AddressCardProps {
  name: string;
  address: string;
  isDefault: boolean;
  onPress: () => void;
  style?: any;
}

export const AddressCard: React.FC<AddressCardProps> = (props: AddressCardProps) => {
  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={props.onPress}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="map-marker" size={24} color={colors.primary} />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{props.name}</Text>
          {props.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultText}>Default</Text>
            </View>
          )}
        </View>
        <Text style={styles.address}>{props.address}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textSecondary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  name: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    marginRight: spacing.sm,
  },
  defaultBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultText: {
    ...typography.caption,
    color: colors.primary,
  },
  address: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
