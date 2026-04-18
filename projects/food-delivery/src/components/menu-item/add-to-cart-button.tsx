import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@/src/components/ui/button';
import { colors, typography } from '@/src/theme';

interface AddToCartButtonProps {
  onPress: () => void;
  price: number;
  existingItem?: any;
  style?: any;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ 
  onPress, 
  price, 
  existingItem, 
  style 
}) => {
  const buttonText = existingItem ? 'Update Cart' : 'Add to Cart';
  
  return (
    <View style={style}>
      <Button
        title={buttonText}
        onPress={onPress}
        variant="primary"
        size="large"
      />
      <Text style={styles.priceText}>${price.toFixed(2)}</Text>
    </View>
  );
};

const styles = {
  priceText: {
    ...typography.small,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 4,
  },
};

export { AddToCartButton };