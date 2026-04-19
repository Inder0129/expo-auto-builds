import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IconButton } from '@/src/components/ui';
import { Filter } from '@/src/types';
import { colors, spacing } from '@/src/theme';

interface Props {
  selectedFilter: Filter;
  onSelectFilter: (filter: Filter) => void;
  style?: any;
}

const filters: { id: Filter; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: 'none', label: 'Original', icon: 'image' },
  { id: 'vintage', label: 'Vintage', icon: 'cafe' },
  { id: 'blackWhite', label: 'B&W', icon: 'contrast' },
  { id: 'warm', label: 'Warm', icon: 'sunny' },
  { id: 'cool', label: 'Cool', icon: 'snow' },
  { id: 'vibrant', label: 'Vibrant', icon: 'color-palette' }
];

export const FilterPicker: React.FC<Props> = ({ selectedFilter, onSelectFilter, style }) => {
  return (
    <View style={style}>
      <Text style={{
        fontSize: 16,
        fontWeight: '600',
        color: colors.text.primary,
        marginBottom: spacing.md
      }}>
        Filters
      </Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: spacing.md,
          paddingHorizontal: 2
        }}
      >
        {filters.map((filter) => (
          <View key={filter.id} style={{
            alignItems: 'center',
            width: 80
          }}>
            <IconButton 
              icon={(
                <Ionicons 
                  name={filter.icon} 
                  size={32} 
                  color={selectedFilter === filter.id ? colors.primary : colors.text.secondary} 
                />
              )}
              onPress={(): void => onSelectFilter(filter.id)}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: selectedFilter === filter.id ? colors.primary + '20' : colors.background.secondary,
                borderWidth: selectedFilter === filter.id ? 2 : 0,
                borderColor: colors.primary
              }}
            />
            <Text style={{
              marginTop: spacing.xs,
              fontSize: 12,
              color: selectedFilter === filter.id ? colors.primary : colors.text.secondary,
              textAlign: 'center'
            }}>
              {filter.label}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
