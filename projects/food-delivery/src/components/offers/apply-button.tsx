import React from 'react';
import { TouchableOpacity, Text, ViewStyle } from 'react-native';
import { colors } from '@/src/theme';

interface ApplyButtonProps {
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

const ApplyButton: React.FC<ApplyButtonProps> = (props: ApplyButtonProps) => {
  const { onPress, disabled, style } = props;
  
  return (
    <TouchableOpacity
      style={[{
        height: 48,
        paddingHorizontal: 24,
        backgroundColor: disabled ? colors.disabled : colors.primary,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
      }, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={{
        fontSize: 16,
        fontWeight: '600',
        color: disabled ? colors.text.secondary : colors.text.onPrimary,
      }}>
        Apply
      </Text>
    </TouchableOpacity>
  );
};

export default ApplyButton;