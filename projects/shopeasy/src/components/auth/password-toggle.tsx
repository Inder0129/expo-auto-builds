import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';

interface PasswordToggleProps {
  visible: boolean;
  onToggle: () => void;
}

export const PasswordToggle: React.FC<PasswordToggleProps> = ({ visible, onToggle }) => {
  return (
    <TouchableOpacity onPress={onToggle} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
      <Ionicons
        name={visible ? 'eye-off-outline' : 'eye-outline'}
        size={24}
        color={colors.text.secondary}
      />
    </TouchableOpacity>
  );
};
