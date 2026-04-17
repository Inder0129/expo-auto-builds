import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';
import { StudyStats } from '@/src/types';

type StatsGridProps = {
  stats: StudyStats;
};

export function StatsGrid({ stats }: StatsGridProps) {
  const statItems = [
    { 
      id: 'hours', 
      title: 'Study Hours', 
      value: `${stats.totalHours}h`, 
      icon: 'clock',
      color: colors.primary 
    },
    { 
      id: 'tests', 
      title: 'Tests Taken', 
      value: stats.testsTaken.toString(), 
      icon: 'check-circle',
      color: colors.success 
    },
    { 
      id: 'rank', 
      title: 'Current Rank', 
      value: `#${stats.currentRank}`, 
      icon: 'award',
      color: colors.warning 
    },
    { 
      id: 'streak', 
      title: 'Day Streak', 
      value: `${stats.dayStreak} days`, 
      icon: 'flame',
      color: colors.error 
    },
  ];
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Study Statistics</Text>
      <View style={styles.grid}>
        {statItems.map((item) => (
          <View key={item.id} style={styles.statItem}>
            <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
              <Feather name={item.icon as keyof typeof Feather.glyphMap} size={24} color={item.color} />
            </View>
            <Text style={styles.statValue}>{item.value}</Text>
            <Text style={styles.statTitle}>{item.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h2,
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statValue: {
    ...typography.h3,
    marginBottom: spacing.xs,
  },
  statTitle: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
