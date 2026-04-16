import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '@/theme';

type TabHeaderProps = {
  title: string;
  subtitle?: string;
};

export const TabHeader: React.FC<TabHeaderProps> = ({ title, subtitle }) => {
  const theme = useThemedStyles();
  
  return (
    <View style={styles.header}>
      <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
      {subtitle && (
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 16
  },
  title: {
    fontSize: 28,
    fontWeight: '700'
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4
  }
});