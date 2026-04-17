import React from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import { useThemeColors } from '@/src/theme';
import { typography } from '@/src/theme/typography';

type ClearDataButtonProps = {
  onPress: () => void;
};

export const ClearDataButton: React.FC<ClearDataButtonProps> = ({ onPress }) => {
  const colors = useThemeColors();

  const handlePress = () => {
    Alert.alert(
      'Clear All Data',
      'This will delete all history and reset settings. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.error,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
      }}
      onPress={handlePress}
    >
      <Text style={[typography.button, { color: colors.onError }]}>
        Clear All Data
      </Text>
    </TouchableOpacity>
  );
};
