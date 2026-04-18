import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

interface SearchResultItemProps {
  item: {
    id: string;
    name: string;
    type: 'restaurant' | 'dish';
    rating: number;
    deliveryTime: string;
    priceRange?: string;
    cuisine?: string;
  };
  onPress: () => void;
  style?: ViewStyle;
}

export const SearchResultItem: React.FC<SearchResultItemProps> = (props: SearchResultItemProps) => {
  const { item, onPress, style } = props;

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons
          name={item.type === 'restaurant' ? 'restaurant' : 'fast-food'}
          size={24}
          color={colors.primary}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.detailsRow}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color={colors.warning} />
            <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
          </View>
          <Text style={styles.detailText}>• {item.deliveryTime}</Text>
          {item.cuisine && <Text style={styles.detailText}>• {item.cuisine}</Text>}
          {item.priceRange && <Text style={styles.detailText}>• {item.priceRange}</Text>}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.gray400} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  name: {
    ...typography.subtitle,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  ratingText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  detailText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginRight: spacing.sm,
  },
});
