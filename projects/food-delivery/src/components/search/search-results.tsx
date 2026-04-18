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

interface SearchResultsProps {
  results: SearchItem[];
  onResultPress: (item: SearchItem) => void;
  style?: ViewStyle;
}

export const SearchResults: React.FC<SearchResultsProps> = (props: SearchResultsProps) => {
  const { results, onResultPress, style } = props;

  const getIconName = useCallback((type: string): keyof typeof Ionicons.glyphMap => {
    switch (type) {
      case 'restaurant': return 'restaurant';
      case 'dish': return 'fast-food';
      case 'cuisine': return 'flag';
      default: return 'search';
    }
  }, []);

  const renderResult = useCallback(({ item }: { item: SearchItem }) => {
    return (
      <TouchableOpacity 
        style={styles.resultItem}
        onPress={() => onResultPress(item)}
      >
        <View style={styles.resultIconContainer}>
          <Ionicons 
            name={getIconName(item.type)} 
            size={20} 
            color={colors.text.secondary} 
          />
        </View>
        <View style={styles.resultContent}>
          <Text style={styles.resultName}>{item.name}</Text>
          <Text style={styles.resultType}>
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </Text>
        </View>
        <Ionicons 
          name="chevron-forward" 
          size={16} 
          color={colors.text.secondary} 
        />
      </TouchableOpacity>
    );
  }, [onResultPress, getIconName]);

  if (results.length === 0) {
    return (
      <View style={[styles.container, style]}>
        <View style={styles.noResultsContainer}>
          <Ionicons name="search-outline" size={64} color={colors.text.secondary} />
          <Text style={styles.noResultsTitle}>No results found</Text>
          <Text style={styles.noResultsText}>Try searching for something else</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.resultsCount}>
        {results.length} result{results.length !== 1 ? 's' : ''} found
      </Text>
      <FlatList
        data={results}
        renderItem={renderResult}
        keyExtractor={(item: SearchItem) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  resultsCount: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  resultIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  resultContent: {
    flex: 1,
  },
  resultName: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  resultType: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsTitle: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.lg,
    color: colors.text.primary,
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
  },
  noResultsText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
  },
});