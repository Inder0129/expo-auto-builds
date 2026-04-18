import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ViewStyle, TextStyle } from 'react-native';

interface Address {
  id: string;
  name: string;
  address: string;
  isDefault: boolean;
}

interface AddressSelectorProps {
  addresses: Address[];
  selectedId: string;
  onSelect: (id: string) => void;
  onAdd: () => void;
  style?: ViewStyle;
}

export const AddressSelector: React.FC<AddressSelectorProps> = ({ 
  addresses, 
  selectedId, 
  onSelect, 
  onAdd, 
  style 
}: AddressSelectorProps) => {
  return (
    <View style={style}>
      {addresses.map((address: Address) => (
        <TouchableOpacity
          key={address.id}
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: '#E5E5EA',
          } as ViewStyle}
          onPress={() => onSelect(address.id)}
        >
          <View style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: selectedId === address.id ? '#FF6B35' : '#C7C7CC',
            backgroundColor: selectedId === address.id ? '#FF6B35' : 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 12,
            marginTop: 2,
          } as ViewStyle}>
            {selectedId === address.id && (
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
            )}
          </View>
          
          <View style={{
            flex: 1,
          } as ViewStyle}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 4,
            } as ViewStyle}>
              <Text style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#1D1D1F',
                marginRight: 8,
              } as TextStyle}>
                {address.name}
              </Text>
              {address.isDefault && (
                <View style={{
                  backgroundColor: '#FF6B35',
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 4,
                } as ViewStyle}>
                  <Text style={{
                    fontSize: 12,
                    color: '#FFFFFF',
                    fontWeight: '600',
                  } as TextStyle}>
                    DEFAULT
                  </Text>
                </View>
              )}
            </View>
            
            <Text style={{
              fontSize: 14,
              color: '#8E8E93',
              lineHeight: 20,
            } as TextStyle}>
              {address.address}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 16,
        } as ViewStyle}
        onPress={onAdd}
      >
        <Ionicons name="add-circle-outline" size={24} color="#FF6B35" />
        <Text style={{
          fontSize: 16,
          color: '#FF6B35',
          fontWeight: '600',
          marginLeft: 12,
        } as TextStyle}>
          Add New Address
        </Text>
      </TouchableOpacity>
    </View>
  );
};
