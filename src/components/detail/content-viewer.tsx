import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

type ContentViewerProps = {
  content: any;
};

export function ContentViewer({ content }: ContentViewerProps) {
  if (!content) {
    return (
      <View style={{ paddingVertical: spacing.xl }}>
        <Text style={[typography.body, { color: colors.textSecondary, textAlign: 'center' }]}>
          No content available
        </Text>
      </View>
    );
  }

  return (
    <View style={{ marginTop: spacing.xl }}>
      <Text style={[typography.h3, { color: colors.textPrimary, marginBottom: spacing.md }]}>
        Content Details
      </Text>
      
      <View style={{ backgroundColor: colors.surface, borderRadius: 8, padding: spacing.lg }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.lg }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="time" size={16} color={colors.textSecondary} />
            <Text style={[typography.small, { color: colors.textSecondary, marginLeft: spacing.xs }]}>
              {content.duration || 'N/A'}
            </Text>
          </View>
          
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="speedometer" size={16} color={colors.textSecondary} />
            <Text style={[typography.small, { color: colors.textSecondary, marginLeft: spacing.xs }]}>
              {content.difficulty || 'N/A'}
            </Text>
          </View>
        </View>
        
        <Text style={[typography.body, { color: colors.textPrimary, marginBottom: spacing.md }]}>
          {content.description}
        </Text>
        
        <ScrollView style={{ maxHeight: 300 }}>
          <Text style={[typography.body, { color: colors.textPrimary }]}>
            {content.content}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}
