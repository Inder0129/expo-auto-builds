import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

interface DishHeaderProps {
  name: string;
  rating: number;
  preparationTime: string;
  imageUrl: string;
  style?: ViewStyle;
}

export const DishHeader: React.FC<DishHeaderProps> = (props: DishHeaderProps) => {
  return (
    <View style={[styles.container, props.style]}>
      <Image
        source={{ uri: props.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Text style={styles.name}>{props.name}</Text>
        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Ionicons name="star" size={16} color={colors.warning} />
            <Text style={styles.detailText}>{props.rating}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>{props.preparationTime}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 250,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: spacing.lg,
  },
  name: {
    ...typography.heading,
    color: colors.white,
    marginBottom: spacing.sm,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  detailText: {
    ...typography.body,
    color: colors.white,
    marginLeft: spacing.xs,
  },
});
