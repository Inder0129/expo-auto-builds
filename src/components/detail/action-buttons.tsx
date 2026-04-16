import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui';
import { useThemedStyles } from '@/theme';
import { createDetailStyles } from '@/styles/detailStyles';

type ActionButtonsProps = {
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onShare: () => void;
};

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onBack,
  onEdit,
  onDelete,
  onShare
}) => {
  const styles = useThemedStyles(createDetailStyles);

  const handleBack = useCallback(() => {
    onBack();
  }, [onBack]);

  const handleEdit = useCallback(() => {
    onEdit();
  }, [onEdit]);

  const handleDelete = useCallback(() => {
    onDelete();
  }, [onDelete]);

  const handleShare = useCallback(() => {
    onShare();
  }, [onShare]);

  return (
    <View style={styles.container}>
      <Button title="Back" onPress={handleBack} />
      <Button title="Edit" onPress={handleEdit} />
      <Button title="Delete" onPress={handleDelete} variant="outline" />
      <Button title="Share" onPress={handleShare} />
    </View>
  );
};
