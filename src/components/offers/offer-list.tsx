import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';

interface Offer {
  id: string;
  title: string;
  description: string;
  code: string;
  discount: string;
  validUntil: string;
  isApplied: boolean;
}

interface OfferListProps {
  offers: Offer[];
  onApplyPress: (offerId: string) => void;
  onCopyPress: (code: string) => void;
  style?: ViewStyle;
}

const OfferList: React.FC<OfferListProps> = (props: OfferListProps) => {
  const { offers, onApplyPress, onCopyPress, style } = props;
  
  return (
    <View style={[{
      paddingHorizontal: 16,
    }, style]}>
      <Text style={{
        fontSize: 18,
        fontWeight: '600',
        color: colors.text.primary,
        marginBottom: 16,
      }}>
        Available Offers
      </Text>
      
      <FlatList
        data={offers}
        keyExtractor={(item: Offer) => item.id}
        renderItem={({ item }: { item: Offer }) => (
          <View style={{
            backgroundColor: colors.surface,
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: item.isApplied ? colors.primary : colors.border,
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: colors.text.primary,
                  marginBottom: 4,
                }}>
                  {item.title}
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: colors.text.secondary,
                  marginBottom: 8,
                }}>
                  {item.description}
                </Text>
                
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                  <View style={{
                    backgroundColor: colors.primary + '20',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 4,
                    marginRight: 8,
                  }}>
                    <Text style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: colors.primary,
                    }}>
                      {item.discount}
                    </Text>
                  </View>
                  
                  <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={() => onCopyPress(item.code)}
                  >
                    <Text style={{
                      fontSize: 14,
                      color: colors.text.secondary,
                      marginRight: 4,
                    }}>
                      Code: {item.code}
                    </Text>
                    <Ionicons name="copy-outline" size={14} color={colors.text.secondary} />
                  </TouchableOpacity>
                </View>
                
                <Text style={{
                  fontSize: 12,
                  color: colors.text.secondary,
                }}>
                  Valid until: {item.validUntil}
                </Text>
              </View>
              
              <TouchableOpacity
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  backgroundColor: item.isApplied ? colors.surface : colors.primary,
                  borderRadius: 6,
                  borderWidth: 1,
                  borderColor: colors.primary,
                }}
                onPress={() => onApplyPress(item.id)}
              >
                <Text style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: item.isApplied ? colors.primary : colors.text.onPrimary,
                }}>
                  {item.isApplied ? 'Applied' : 'Apply'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default OfferList;