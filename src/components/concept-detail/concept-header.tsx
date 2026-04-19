import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

interface ConceptHeaderProps {
  concept: {
    id: string;
    title: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    category: string;
    prerequisites: string[];
  };
  onRelatedConceptSelect?: (conceptId: string) => void;
  style?: ViewStyle;
}

export const ConceptHeader: React.FC<ConceptHeaderProps> = ({ concept, onRelatedConceptSelect, style }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return colors.success;
      case 'intermediate': return colors.warning;
      case 'advanced': return colors.error;
      default: return colors.onSurfaceVariant;
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.headerRow}>
        <Text style={styles.category}>{concept.category}</Text>
        <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(concept.difficulty) }]}>
          <Text style={styles.difficultyText}>{concept.difficulty.toUpperCase()}</Text>
        </View>
      </View>
      <Text style={styles.title}>{concept.title}</Text>
      
      {concept.prerequisites.length > 0 && (
        <View style={styles.prerequisitesContainer}>
          <Text style={styles.prerequisitesTitle}>Prerequisites:</Text>
          <View style={styles.tagsContainer}>
            {concept.prerequisites.map((prerequisite: string, index: number) => (
              <TouchableOpacity 
                key={index} 
                style={styles.tag}
                onPress={() => onRelatedConceptSelect?.(prerequisite.toLowerCase().replace(/\s+/g, '-'))}
              >
                <Text style={styles.tagText}>{prerequisite}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md
  },
  category: {
    fontSize: typography.bodyMedium.fontSize,
    fontFamily: typography.bodyMedium.fontFamily,
    color: colors.primary,
    fontWeight: '600'
  },
  difficultyBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 16
  },
  difficultyText: {
    fontSize: typography.labelSmall.fontSize,
    fontFamily: typography.labelSmall.fontFamily,
    color: colors.onPrimary,
    fontWeight: '600'
  },
  title: {
    fontSize: typography.headlineMedium.fontSize,
    fontFamily: typography.headlineMedium.fontFamily,
    color: colors.onSurface,
    marginBottom: spacing.lg
  },
  prerequisitesContainer: {
    marginTop: spacing.sm
  },
  prerequisitesTitle: {
    fontSize: typography.labelLarge.fontSize,
    fontFamily: typography.labelLarge.fontFamily,
    color: colors.onSurface,
    marginBottom: spacing.sm
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs
  },
  tag: {
    backgroundColor: colors.surfaceVariant,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 16
  },
  tagText: {
    fontSize: typography.bodySmall.fontSize,
    fontFamily: typography.bodySmall.fontFamily,
    color: colors.onSurfaceVariant
  }
});
