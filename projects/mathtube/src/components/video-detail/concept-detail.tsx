import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

interface ConceptDetailProps {
  concept: {
    id: string;
    title: string;
    description: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    relatedConcepts: string[];
  };
  onConceptSelect?: (conceptId: string) => void;
  style?: ViewStyle;
}

export const ConceptDetail: React.FC<ConceptDetailProps> = ({ concept, onConceptSelect, style }) => {
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
      <View style={styles.header}>
        <Text style={styles.title}>Concept Details</Text>
        <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(concept.difficulty) }]}>
          <Text style={styles.difficultyText}>{concept.difficulty.toUpperCase()}</Text>
        </View>
      </View>
      <Text style={styles.conceptTitle}>{concept.title}</Text>
      <Text style={styles.description}>{concept.description}</Text>
      
      {concept.relatedConcepts.length > 0 && (
        <View style={styles.relatedConceptsContainer}>
          <Text style={styles.relatedTitle}>Related Concepts:</Text>
          <View style={styles.tagsContainer}>
            {concept.relatedConcepts.map((relatedConcept: string, index: number) => (
              <TouchableOpacity 
                key={index} 
                style={styles.tag}
                onPress={() => onConceptSelect?.(relatedConcept.toLowerCase().replace(/\s+/g, '-'))}
              >
                <Text style={styles.tagText}>{relatedConcept}</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md
  },
  title: {
    fontSize: typography.titleSmall.fontSize,
    fontFamily: typography.titleSmall.fontFamily,
    color: colors.onSurface
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
  conceptTitle: {
    fontSize: typography.headlineSmall.fontSize,
    fontFamily: typography.headlineSmall.fontFamily,
    color: colors.onSurface,
    marginBottom: spacing.sm
  },
  description: {
    fontSize: typography.bodyMedium.fontSize,
    fontFamily: typography.bodyMedium.fontFamily,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
    marginBottom: spacing.lg
  },
  relatedConceptsContainer: {
    marginTop: spacing.md
  },
  relatedTitle: {
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
