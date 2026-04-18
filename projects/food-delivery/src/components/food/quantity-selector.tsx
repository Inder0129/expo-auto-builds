import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ViewStyle, TextStyle } from 'react-native';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  style?: ViewStyle;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({ 
  quantity, 
  onQuantityChange, 
  style 
}: QuantitySelectorProps) => {
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };
  
  const handleIncrease = () => {
    onQuantityChange(quantity + 1);
  };
  
  return (
    <View style={[{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 24,
    }, style]}>
      <Text style={{
        fontSize: 18,
        fontWeight: '600',
        color: '#1D1D1F',
      } as TextStyle}>
        Quantity
      </Text>
      
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
      } as ViewStyle}>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#F2F2F7',
            justifyContent: 'center',
            alignItems: 'center',
          } as ViewStyle}
          onPress={handleDecrease}
          disabled={quantity <= 1}
        >
          <Ionicons name="remove" size={24} color={quantity <= 1 ? '#C7C7CC' : '#1D1D1F'} />
        </TouchableOpacity>
        
        <Text style={{
          fontSize: 18,
          fontWeight: '600',
          color: '#1D1D1F',
          marginHorizontal: 20,
          minWidth: 30,
          textAlign: 'center',
        } as TextStyle}>
          {quantity}
        </Text>
        
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#F2F2F7',
            justifyContent: 'center',
            alignItems: 'center',
          } as ViewStyle}
          onPress={handleIncrease}
        >
          <Ionicons name="add" size={24} color="#1D1D1F" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
