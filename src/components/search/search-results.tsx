import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';

interface SearchResult {
  id: string;
  name: string;
  type: 'restaurant' | 'dish';
  rating: number;
  deliveryTime: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  onResultPress: (result: SearchResult) => void;
  style?: ViewStyle;
}

const SearchResults: React.FC<SearchResultsProps> = (props: SearchResultsProps) => {
  const { results, onResultPress, style } = props;
  
  if (results.length === 0) {
    return (
      <View style={[{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
      }, style]}>
        <Ionicons name="search" size={64} color={colors.text.secondary} />
        <Text style={{
          fontSize: 18,
          color: colors.text.secondary,
          marginTop: 16,
          textAlign: 'center',
        }}>
          No results found
        </Text>
      </View>
    );
  }
  
  return (
    <View style={[{
      padding: 16,
    }, style]}>
      <Text style={{
        fontSize: 18,
        fontWeight: '600',
        color: colors.text.primary,
        marginBottom: 16,
      }}>
        Search Results
      </Text>
      
      <FlatList
        data={results}
        keyExtractor={(item: SearchResult) => item.id}
        renderItem={({ item }: { item: SearchResult }) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}
            onPress={() => onResultPress(item)}
          >
            <View style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              backgroundColor: colors.surface,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 12,
            }}>
              <Ionicons 
                name={item.type === 'restaurant' ? 'restaurant' : 'fast-food'}
                size={24}
                color={colors.primary}
              />
            </View>
            
            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: 16,
                fontWeight: '500',
                color: colors.text.primary,
                marginBottom: 4,
              }}>
                {item.name}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="star" size={14} color={colors.warning} />
                <Text style={{
                  fontSize: 14,
                  color: colors.text.secondary,
                  marginLeft: 4,
                  marginRight: 12,
                }}>
                  {item.rating}
                </Text>
                <Ionicons name="time-outline" size={14} color={colors.text.secondary} />
                <Text style={{
                  fontSize: 14,
                  color: colors.text.secondary,
                  marginLeft: 4,
                }}>
                  {item.deliveryTime}
                </Text>
              </View>
            </View>
            
            <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SearchResults;