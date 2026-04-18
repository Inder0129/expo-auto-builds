import React, { useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

interface SearchItem {
  id: string;
  name: string;
  type: 'restaurant' | 'dish' | 'cuisine';
}

interface SearchSuggestionProps {
  suggestions: SearchItem[];
  onSuggestionPress: (item: SearchItem) => void;
  style?: ViewStyle;
}

export const SearchSuggestion: React.FC<SearchSuggestionProps> = (props: SearchSuggestionProps) => {
  const { suggestions, onSuggestionPress, style } = props;

  const getIconName = useCallback((type: string): keyof typeof Ionicons.glyphMap => {
    switch (type) {
      case 'restaurant': return 'restaurant';
      case 'dish': return 'fast-food';
      case 'cuisine': return 'flag';
      default: return 'search';
    }
  }, []);

  const renderSuggestion = useCallback(({ item }: { item: SearchItem }) => {
    return (
      <TouchableOpacity 
        style={styles.suggestionItem}
        onPress={() => onSuggestionPress(item)}
      >
        <View style={styles.suggestionIconContainer}>
          <Ionicons 
            name={getIconName(item.type)} 
            size={20} 
            color={colors.text.secondary} 
          />
        </View>
        <Text style={styles.suggestionText}>{item.name}</Text>
        <Ionicons 
          name="chevron-forward" 
          size={16} 
          color={colors.text.secondary} 
        />
      </TouchableOpacity>
    );
  }, [onSuggestionPress, getIconName]);

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>Popular Searches</Text>
      <FlatList
        data={suggestions}
        renderItem={renderSuggestion}
        keyExtractor={(item: SearchItem) => item.id}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.lg,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  suggestionIconContainer: {
    width: 32,
    alignItems: 'center',
  },
  suggestionText: {
    flex: 1,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    marginLeft: spacing.sm,
  },
});