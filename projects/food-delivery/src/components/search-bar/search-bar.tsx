import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';

interface SearchBarProps {
  onPress: () => void;
  style?: any;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Ionicons name="search" size={20} color={colors.textSecondary} />
      <Text style={styles.placeholder}>Search restaurants or dishes</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  placeholder: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
  },
});
