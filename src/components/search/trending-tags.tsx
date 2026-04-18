import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/src/theme';

interface TrendingTag {
  id: string;
  name: string;
  count: number;
}

interface TrendingTagsProps {
  tags: TrendingTag[];
  onTagPress: (tag: TrendingTag) => void;
  style?: ViewStyle;
}

const TrendingTags: React.FC<TrendingTagsProps> = (props: TrendingTagsProps) => {
  const { tags, onTagPress, style } = props;

  const handleTagPress = useCallback((tag: TrendingTag) => {
    onTagPress(tag);
  }, [onTagPress]);

  if (tags.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>Trending Now</Text>
      <View style={styles.tagsContainer}>
        {tags.map((tag: TrendingTag) => (
          <TouchableOpacity
            key={tag.id}
            style={styles.tagButton}
            onPress={() => handleTagPress(tag)}
          >
            <Text style={styles.tagName}>{tag.name}</Text>
            <Text style={styles.tagCount}>{tag.count}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagName: {
    fontSize: 14,
    color: colors.textPrimary,
    marginRight: 4,
  },
  tagCount: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

export default TrendingTags;
