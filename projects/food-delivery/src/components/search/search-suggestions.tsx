import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, FlatList, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';

interface SearchSuggestionsProps {
  query: string;
  onSuggestionPress?: (suggestion: string) => void;
  style?: ViewStyle;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = (props: SearchSuggestionsProps) => {
  const { query, onSuggestionPress, style } = props;
  
  const suggestions = useMemo(() => {
    if (!query) return [];
    const allSuggestions = [
      `${query} near me`,
      `${query} delivery`,
      `${query} restaurant`,
      `Best ${query}`,
      `${query} offers`,
    ];
    return allSuggestions;
  }, [query]);
  
  const handleSuggestionPress = (suggestion: string) => {
    onSuggestionPress?.(suggestion);
  };
  
  if (suggestions.length === 0) return null;
  
  return (
    <View style={[{
      padding: 16,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    }, style]}>
      <Text style={{
        fontSize: 14,
        fontWeight: '600',
        color: colors.text.secondary,
        marginBottom: 12,
      }}>
        Suggestions
      </Text>
      <FlatList
        data={suggestions}
        keyExtractor={(item: string, index: number) => index.toString()}
        renderItem={({ item }: { item: string }) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 10,
            }}
            onPress={() => handleSuggestionPress(item)}
          >
            <Ionicons name="search" size={16} color={colors.text.secondary} style={{ marginRight: 12 }} />
            <Text style={{
              fontSize: 16,
              color: colors.text.primary,
            }}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SearchSuggestions;