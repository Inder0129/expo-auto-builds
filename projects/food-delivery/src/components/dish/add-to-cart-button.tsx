import React from 'react';
import { Button } from '@/src/components/ui/button';

interface AddToCartButtonProps {
  onPress: () => void;
  disabled: boolean;
  style?: ViewStyle;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = (props: AddToCartButtonProps) => {
  return (
    <Button
      title="Add to Cart"
      onPress={props.onPress}
      variant="primary"
      size="large"
      disabled={props.disabled}
      style={props.style}
    />
  );
};
