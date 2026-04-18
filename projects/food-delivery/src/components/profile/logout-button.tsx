import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';
import styles from './logout-button.styles';

interface Props {
  onPress: () => void;
}

export const LogoutButton: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name="log-out-outline" size={24} color={colors.error} />
      <Text style={styles.text}>Logout</Text>
    </TouchableOpacity>
  );
};
