import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= review.rating ? 'star' : 'star-outline'}
          size={16}
          color={i <= review.rating ? colors.warning : colors.text.secondary}
        />
      );
    }
    return stars;
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.userName}>{review.userName}</Text>
        <View style={styles.ratingContainer}>
          {renderStars()}
        </View>
      </View>
      <Text style={styles.comment}>{review.comment}</Text>
      <Text style={styles.date}>{review.date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  userName: {
    ...typography.bodyBold,
    color: colors.text.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  comment: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  date: {
    ...typography.caption,
    color: colors.text.secondary,
  },
});
