import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useThemeColors } from '@/src/theme';
import { typography } from '@/src/theme/typography';

type ClearHistoryButtonProps = {
  onPress: () => void;
};

export const ClearHistoryButton: React.FC<ClearHistoryButtonProps> = ({ onPress }) => {
  const colors = useThemeColors();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.error,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
      }}
      onPress={onPress}
    >
      <Text style={[typography.button, { color: colors.onError }]}>
        Clear History
      </Text>
    </TouchableOpacity>
  );
};
