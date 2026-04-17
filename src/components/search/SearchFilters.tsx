import React, { useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

type Filter = {
  id: string;
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
};

type SearchFiltersProps = {
  selectedFilters: string[];
  onFilterToggle: (filterId: string) => void;
};

export default function SearchFilters({
  selectedFilters,
  onFilterToggle,
}: SearchFiltersProps) {
  const filters: Filter[] = [
    { id: 'rating', label: 'Rating 4.0+', icon: 'star' },
    { id: 'fastDelivery', label: 'Fast Delivery', icon: 'flash' },
    { id: 'pureVeg', label: 'Pure Veg', icon: 'leaf' },
    { id: 'offers', label: 'Offers', icon: 'pricetag' },
    { id: 'cuisine', label: 'Cuisine', icon: 'restaurant' },
  ];

  const renderFilter = useCallback((filter: Filter) => (
    <TouchableOpacity
      key={filter.id}
      style={[
        styles.filterButton,
        selectedFilters.includes(filter.id) && styles.filterButtonActive,
      ]}
      onPress={() => onFilterToggle(filter.id)}
    >
      {filter.icon && (
        <Ionicons
          name={filter.icon}
          size={16}
          color={selectedFilters.includes(filter.id) ? colors.white : colors.primary}
          style={styles.filterIcon}
        />
      )}
      <Text
        style={[
          styles.filterText,
          selectedFilters.includes(filter.id) && styles.filterTextActive,
        ]}
      >
        {filter.label}
      </Text>
    </TouchableOpacity>
  ), [selectedFilters, onFilterToggle]);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContent}
      >
        {filters.map(renderFilter)}
      </ScrollView>
    </View>
  );
}

const styles = {
  container: {
    marginBottom: spacing.md,
  },
  filtersContent: {
    paddingRight: spacing.md,
  },
  filterButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginRight: spacing.sm,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterIcon: {
    marginRight: spacing.xs,
  },
  filterText: {
    ...typography.caption,
    color: colors.text.primary,
  },
  filterTextActive: {
    color: colors.white,
    fontWeight: '600' as const,
  },
};
