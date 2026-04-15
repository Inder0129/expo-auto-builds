import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { moderateScaleFactor, spacing, fontSize } from '@/theme';

type OptionRowProps = {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: any;
};

export const OptionRow: React.FC<OptionRowProps> = ({
  title,
  subtitle,
  onPress,
  icon,
  rightIcon,
  style,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        style,
      ]}
    >
      {icon && <View style={styles.icon}>{icon}</View>}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  pressed: {
    backgroundColor: '#f5f5f5',
  },
  icon: {
    marginRight: spacing.sm,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: '500',
    color: '#000',
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: '#666',
    marginTop: spacing.xs,
  },
  rightIcon: {
    marginLeft: spacing.sm,
  },
});