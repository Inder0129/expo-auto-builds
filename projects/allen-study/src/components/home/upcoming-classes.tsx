import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

type ClassItem = {
  id: string;
  title: string;
  time: string;
  instructor: string;
};

type UpcomingClassesProps = {
  classes: ClassItem[];
  onPress: (classId: string) => void;
};

export function UpcomingClasses({ classes, onPress }: UpcomingClassesProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Upcoming Classes</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      {classes.map((classItem) => (
        <TouchableOpacity
          key={classItem.id}
          style={styles.classItem}
          onPress={() => onPress(classItem.id)}
        >
          <View style={styles.timeContainer}>
            <Feather name="clock" size={16} color={colors.primary} />
            <Text style={styles.time}>{classItem.time}</Text>
          </View>
          <Text style={styles.classTitle}>{classItem.title}</Text>
          <Text style={styles.instructor}>By {classItem.instructor}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h2,
  },
  seeAll: {
    ...typography.body,
    color: colors.primary,
  },
  classItem: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  time: {
    ...typography.caption,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  classTitle: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  instructor: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
