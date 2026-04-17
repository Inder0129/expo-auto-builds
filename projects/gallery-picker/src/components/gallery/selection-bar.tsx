import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Button } from '../ui';
import { colors } from '../../theme';
import styles from '../../styles/gallery';

type SelectionBarProps = {
  selectedCount: number;
  onClear: () => void;
};

export function SelectionBar({ selectedCount, onClear }: SelectionBarProps) {
  return (
    <View style={styles.selectionBar}>
      <Text style={{ color: colors.text, marginRight: 16 }}>
        {selectedCount} selected
      </Text>
      <Button title="Clear" onPress={onClear} />
    </View>
  );
}
