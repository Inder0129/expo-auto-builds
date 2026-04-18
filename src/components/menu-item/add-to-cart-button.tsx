import React from 'react';
import { ViewStyle } from 'react-native';
import { Button } from '@/src/components/ui';

export interface AddToCartButtonProps {
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = (props: AddToCartButtonProps) => {
  const { onPress, disabled, style } = props;
  
  return (
    <Button
      title="Add to Cart"
      onPress={onPress}
      variant="primary"
      size="large"
      disabled={disabled}
      style={style}
    />
  );
};
