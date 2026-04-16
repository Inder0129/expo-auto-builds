import React from 'react';
import { View } from 'react-native';
import { DetailContent } from '@/components/detail';
import { ActionButtons } from '@/components/detail';
import { useThemedStyles } from '@/theme';
import { createDetailStyles } from '@/styles/detailStyles';

type DetailScreenProps = {
  itemId: string;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onShare: () => void;
};

export const DetailScreen: React.FC<DetailScreenProps> = ({
  itemId,
  onBack,
  onEdit,
  onDelete,
  onShare
}) => {
  const styles = useThemedStyles(createDetailStyles);

  return (
    <View style={styles.container}>
      <DetailContent itemId={itemId} />
      <ActionButtons
        onBack={onBack}
        onEdit={onEdit}
        onDelete={onDelete}
        onShare={onShare}
      />
    </View>
  );
};
