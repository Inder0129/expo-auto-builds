import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';

interface FilterChipProps {
  filter: {
    id: string;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
  };
  isSelected: boolean;
  onPress: () => void;
  style?: any;
}

export const FilterChip: React.FC<FilterChipProps> = ({ filter, isSelected, onPress, style }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.selectedContainer,
        style
      ]}
      onPress={onPress}
    >
      <Ionicons
        name={filter.icon}
        size={16}
        color={isSelected ? colors.white : colors.primary}
      />
      <Text style={[
        styles.label,
        isSelected && styles.selectedLabel
      ]}>
        {filter.label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedContainer: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  selectedLabel: {
    color: colors.white,
  },
});
