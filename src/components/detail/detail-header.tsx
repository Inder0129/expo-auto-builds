import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

type DetailHeaderProps = {
  title: string;
  subtitle?: string;
  instructor?: string;
  rating?: number;
};

export function DetailHeader({ title, subtitle, instructor, rating }: DetailHeaderProps) {
  return (
    <View>
      <Text style={[typography.h1, { color: colors.textPrimary, marginBottom: spacing.xs }]}>
        {title}
      </Text>
      
      {subtitle && (
        <Text style={[typography.h3, { color: colors.textSecondary, marginBottom: spacing.md }]}>
          {subtitle}
        </Text>
      )}
      
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.lg }}>
        {instructor && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="person" size={16} color={colors.textSecondary} />
            <Text style={[typography.small, { color: colors.textSecondary, marginLeft: spacing.xs }]}>
              {instructor}
            </Text>
          </View>
        )}
        
        {rating !== undefined && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="star" size={16} color={colors.warning} />
            <Text style={[typography.small, { color: colors.textSecondary, marginLeft: spacing.xs }]}>
              {rating.toFixed(1)}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
