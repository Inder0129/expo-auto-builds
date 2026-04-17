import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'video' | 'pdf' | 'quiz';
};

type ResourceListProps = {
  resources: Resource[];
  onPress: (resourceId: string) => void;
};

export function ResourceList({ resources, onPress }: ResourceListProps) {
  const getIconName = (type: Resource['type']) => {
    switch (type) {
      case 'video': return 'video';
      case 'pdf': return 'file-text';
      case 'quiz': return 'check-circle';
      default: return 'file';
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Study Resources</Text>
      {resources.map((resource) => (
        <TouchableOpacity
          key={resource.id}
          style={styles.resourceItem}
          onPress={() => onPress(resource.id)}
        >
          <View style={styles.iconContainer}>
            <Feather name={getIconName(resource.type)} size={20} color={colors.primary} />
          </View>
          <View style={styles.content}>
            <Text style={styles.resourceTitle}>{resource.title}</Text>
            <Text style={styles.resourceDescription} numberOfLines={2}>
              {resource.description}
            </Text>
            <Text style={styles.resourceCategory}>{resource.category}</Text>
          </View>
          <Feather name="chevron-right" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h2,
    marginBottom: spacing.md,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  resourceTitle: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  resourceDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  resourceCategory: {
    ...typography.caption,
    color: colors.primary,
    fontSize: 12,
  },
});
