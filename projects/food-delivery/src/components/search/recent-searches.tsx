import React, { useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

interface RecentSearch {
  id: string;
  query: string;
  timestamp: number;
}

interface RecentSearchesProps {
  searches: RecentSearch[];
  onSearchPress: (search: RecentSearch) => void;
  onClearPress: () => void;
  style?: ViewStyle;
}

export const RecentSearches: React.FC<RecentSearchesProps> = (props: RecentSearchesProps) => {
  const { searches, onSearchPress, onClearPress, style } = props;

  const renderRecentSearch = useCallback(({ item }: { item: RecentSearch }) => {
    return (
      <TouchableOpacity 
        style={styles.recentSearchItem}
        onPress={() => onSearchPress(item)}
      >
        <Ionicons 
          name="time-outline" 
          size={20} 
          color={colors.text.secondary} 
          style={styles.recentSearchIcon}
        />
        <Text style={styles.recentSearchText}>{item.query}</Text>
      </TouchableOpacity>
    );
  }, [onSearchPress]);

  if (searches.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Searches</Text>
        <TouchableOpacity onPress={onClearPress}>
          <Text style={styles.clearText}>Clear all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={searches}
        renderItem={renderRecentSearch}
        keyExtractor={(item: RecentSearch) => item.id}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.lg,
    color: colors.text.primary,
  },
  clearText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.primary.main,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  recentSearchIcon: {
    marginRight: spacing.sm,
  },
  recentSearchText: {
    flex: 1,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
  },
});