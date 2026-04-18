import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';

interface RecentSearch {
  id: string;
  query: string;
  timestamp: string;
}

interface RecentSearchesProps {
  searches: RecentSearch[];
  onSearchPress: (search: RecentSearch) => void;
  onClearPress: () => void;
  style?: ViewStyle;
}

const RecentSearches: React.FC<RecentSearchesProps> = (props: RecentSearchesProps) => {
  const { searches, onSearchPress, onClearPress, style } = props;
  
  if (searches.length === 0) return null;
  
  return (
    <View style={[{
      padding: 16,
    }, style]}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      }}>
        <Text style={{
          fontSize: 18,
          fontWeight: '600',
          color: colors.text.primary,
        }}>
          Recent Searches
        </Text>
        <TouchableOpacity onPress={onClearPress}>
          <Text style={{
            fontSize: 14,
            color: colors.primary,
          }}>
            Clear All
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={searches}
        keyExtractor={(item: RecentSearch) => item.id}
        renderItem={({ item }: { item: RecentSearch }) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}
            onPress={() => onSearchPress(item)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="time-outline" size={20} color={colors.text.secondary} style={{ marginRight: 12 }} />
              <Text style={{
                fontSize: 16,
                color: colors.text.primary,
              }}>
                {item.query}
              </Text>
            </View>
            <Text style={{
              fontSize: 14,
              color: colors.text.secondary,
            }}>
              {item.timestamp}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default RecentSearches;