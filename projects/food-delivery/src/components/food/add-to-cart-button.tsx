import { TouchableOpacity, Text } from 'react-native';
import { ViewStyle, TextStyle } from 'react-native';

interface AddToCartButtonProps {
  onPress: () => void;
  totalPrice: number;
  style?: ViewStyle;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ 
  onPress, 
  totalPrice, 
  style 
}: AddToCartButtonProps) => {
  return (
    <TouchableOpacity
      style={[{
        backgroundColor: '#FF6B35',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
      }, style]}
      onPress={onPress}
    >
      <Text style={{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
      } as TextStyle}>
        Add to Cart • ${totalPrice.toFixed(2)}
      </Text>
    </TouchableOpacity>
  );
};
