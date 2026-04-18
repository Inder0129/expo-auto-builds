import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ViewStyle, TextStyle } from 'react-native';

interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}

interface CustomizationOptionsProps {
  options: CustomizationOption[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  style?: ViewStyle;
}

export const CustomizationOptions: React.FC<CustomizationOptionsProps> = ({ 
  options, 
  selectedIds, 
  onToggle, 
  style 
}: CustomizationOptionsProps) => {
  return (
    <View style={[{
      marginBottom: 24,
    }, style]}>
      <Text style={{
        fontSize: 18,
        fontWeight: '600',
        color: '#1D1D1F',
        marginBottom: 12,
      } as TextStyle}>
        Customizations
      </Text>
      
      {options.map((option: CustomizationOption) => {
        const isSelected = selectedIds.includes(option.id);
        return (
          <TouchableOpacity
            key={option.id}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: '#E5E5EA',
            } as ViewStyle}
            onPress={() => onToggle(option.id)}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            } as ViewStyle}>
              <View style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: isSelected ? '#FF6B35' : '#C7C7CC',
                backgroundColor: isSelected ? '#FF6B35' : 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 12,
              } as ViewStyle}>
                {isSelected && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={{
                fontSize: 16,
                color: '#1D1D1F',
              } as TextStyle}>
                {option.name}
              </Text>
            </View>
            <Text style={{
              fontSize: 16,
              color: '#FF6B35',
              fontWeight: '600',
            } as TextStyle}>
              +${option.price.toFixed(2)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
