import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/src/theme';

interface SearchSuggestionProps {
  item: {
    id: string;
    name: string;
    type: 'restaurant' | 'dish' | 'cuisine';
  };
  onPress: () => void;
}

export const SearchSuggestion: React.FC<SearchSuggestionProps> = (props: SearchSuggestionProps) => {
  const { item, onPress } = props;

  const getIconName = (type: string) => {
    switch (type) {
      case 'restaurant': return 'restaurant';
      case 'dish': return 'fast-food';
      case 'cuisine': return 'flag';
      default: return 'search';
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name={getIconName(item.type)} size={20} color={colors.primary} style={styles.icon} />
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.type}>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.muted} />
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
  icon: {
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 2,
  },
  type: {
    fontSize: 14,
    color: colors.muted,
  },
});
