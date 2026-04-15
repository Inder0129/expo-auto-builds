import React from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles } from '../../theme/index';
import { moderateScale } from 'react-native-size-matters';

export const HistoryScreen = () => {
  const { colors, typography, spacing } = useThemedStyles();
  const handleViewHistory = React.useCallback(() => {
    // view history logic
  }, []);

  return (
    <View style={{
      backgroundColor: colors.background,
      paddingHorizontal: spacing.large,
      paddingVertical: spacing.large,
    }}>
      <Text style={{
        fontSize: moderateScale(24),
        fontFamily: typography.fontFamily,
        color: colors.text,
      }}>History Screen</Text>
    </View>
  );
};