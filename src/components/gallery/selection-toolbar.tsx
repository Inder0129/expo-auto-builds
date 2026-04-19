import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IconButton } from '@/src/components/ui';
import { colors } from '@/src/theme';

interface SelectionToolbarProps {
  selectedCount: number;
  totalCount: number;
  onDelete: () => void;
  onSelectAll: () => void;
  onCancel: () => void;
  style?: any;
}

export function SelectionToolbar(props: SelectionToolbarProps) {
  const { selectedCount, totalCount, onDelete, onSelectAll, onCancel, style } = props;

  return (
    <View style={[styles.container, style]}>
      <IconButton
        icon="close"
        onPress={onCancel}
        variant="ghost"
        size="small"
      />
      
      <Text style={styles.text}>
        {selectedCount} selected
      </Text>
      
      <View style={styles.actions}>
        <IconButton
          icon={selectedCount === totalCount ? "checkbox" : "square-outline"}
          onPress={onSelectAll}
          variant="ghost"
          size="small"
        />
        <IconButton
          icon="trash"
          onPress={onDelete}
          variant="ghost"
          size="small"
          color={colors.error}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  text: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
  },
});
