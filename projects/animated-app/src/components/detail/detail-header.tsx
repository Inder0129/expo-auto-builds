import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

interface DetailHeaderProps {
  title: string;
  onBack: () => void;
  style?: ViewStyle;
}

export const DetailHeader: React.FC<DetailHeaderProps> = ({ title, onBack, style }) => {
  const handleShare = useCallback(() => {
    console.log('Share:', title);
  }, [title]);

  return (
    <Animated.View 
      entering={FadeIn.duration(600)}
      style={[{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.xl,
        paddingBottom: spacing.md,
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }, style]}
    >
      <TouchableOpacity 
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: colors.surface,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: colors.border,
        }}
        onPress={onBack}
      >
        <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
      </TouchableOpacity>

      <Text 
        style={{
          fontSize: typography.fontSize.lg,
          fontWeight: '600',
          color: colors.textPrimary,
          flex: 1,
          textAlign: 'center',
          marginHorizontal: spacing.md,
        }}
        numberOfLines={1}
      >
        {title}
      </Text>

      <TouchableOpacity 
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: colors.surface,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: colors.border,
        }}
        onPress={handleShare}
      >
        <Ionicons name="share-outline" size={20} color={colors.textPrimary} />
      </TouchableOpacity>
    </Animated.View>
  );
};
