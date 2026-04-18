import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';

interface FilterButtonProps {
  onPress: () => void;
}

export const FilterButton: React.FC<FilterButtonProps> = (props: FilterButtonProps) => {
  const { onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Ionicons name="filter" size={24} color={colors.primary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});
