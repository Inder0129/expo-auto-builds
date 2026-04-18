import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';
import { Card } from '@/src/components/ui/card';

export interface AddressCardProps {
  name: string;
  address: string;
  isDefault: boolean;
  style?: any;
}

export const AddressCard: React.FC<AddressCardProps> = ({ name, address, isDefault, style }) => {
  return (
    <Card style={[styles.container, style]}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="map-marker" size={20} color={colors.primary.main} />
        <Text style={styles.name}>{name}</Text>
        {isDefault && (
          <View style={styles.defaultBadge}>
            <Text style={styles.defaultText}>Default</Text>
          </View>
        )}
      </View>
      <Text style={styles.address}>{address}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 280,
    marginRight: spacing.md,
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  name: {
    ...typography.bodyBold,
    color: colors.text.primary,
    marginLeft: spacing.xs,
    flex: 1,
  },
  defaultBadge: {
    backgroundColor: colors.primary.light,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultText: {
    ...typography.caption,
    color: colors.primary.main,
  },
  address: {
    ...typography.body,
    color: colors.text.secondary,
    lineHeight: 20,
  },
});
