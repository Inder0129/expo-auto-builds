import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '@/theme';

type TabHeaderProps = {
  title: string;
  subtitle?: string;
};

export const TabHeader: React.FC<TabHeaderProps> = ({ title, subtitle }) => {
  const styles = useThemedStyles(createStyles);
  
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const createStyles = (theme: any) => StyleSheet.create({
  header: {
    marginBottom: theme.spacing.lg
  },
  title: {
    fontSize: theme.typography.title1.fontSize,
    fontWeight: 'bold',
    color: theme.colors.text
  },
  subtitle: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs
  }
});