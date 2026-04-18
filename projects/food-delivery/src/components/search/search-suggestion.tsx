import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';

interface SearchSuggestionProps {
  title: string;
  type: 'restaurant' | 'dish' | 'category';
  onPress: () => void;
  style?: ViewStyle;
}

const SearchSuggestion: React.FC<SearchSuggestionProps> = ({ title, type, onPress, style }) => {
  const getIconName = (): keyof typeof Ionicons.glyphMap => {
    switch (type) {
      case 'restaurant': return 'restaurant';
      case 'dish': return 'fast-food';
      case 'category': return 'pizza';
      default: return 'search';
    }
  };

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Ionicons name={getIconName()} size={20} color={colors.textSecondary} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  title: {
    marginLeft: 12,
    fontSize: 16,
    color: colors.textPrimary
  }
});

export default SearchSuggestion;