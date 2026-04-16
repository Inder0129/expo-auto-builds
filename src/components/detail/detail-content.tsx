import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { Card } from '@/components/ui';
import { useThemedStyles } from '@/theme';
import { createDetailStyles } from '@/styles/detailStyles';

type DetailContentProps = {
  itemId: string;
};

export const DetailContent: React.FC<DetailContentProps> = ({ itemId }) => {
  const styles = useThemedStyles(createDetailStyles);

  const content = useMemo(() => ({
    title: `Item ${itemId}`,
    description: `This is the detailed content for item ${itemId}.`,
    details: `Additional information about item ${itemId}.`
  }), [itemId]);

  return (
    <Card>
      <Text>{content.title}</Text>
      <Text>{content.description}</Text>
      <Text>{content.details}</Text>
    </Card>
  );
};
