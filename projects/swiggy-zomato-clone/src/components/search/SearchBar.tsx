import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

type SearchType = 'restaurants' | 'dishes';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  searchType: SearchType;
  onSearchTypeChange: (type: SearchType) => void;
};

export default function SearchBar({
  value,
  onChangeText,
  searchType,
  onSearchTypeChange,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.text.secondary} />
        <TextInput
          style={styles.input}
          placeholder={`Search ${searchType}...`}
          placeholderTextColor={colors.text.secondary}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={() => onChangeText('')}>
            <Ionicons name="close-circle" size={20} color={colors.text.secondary} />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.typeSelector}>
        <TouchableOpacity
          style={[
            styles.typeButton,
            searchType === 'restaurants' && styles.typeButtonActive,
          ]}
          onPress={() => onSearchTypeChange('restaurants')}
        >
          <Text
            style={[
              styles.typeButtonText,
              searchType === 'restaurants' && styles.typeButtonTextActive,
            ]}
          >
            Restaurants
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.typeButton,
            searchType === 'dishes' && styles.typeButtonActive,
          ]}
          onPress={() => onSearchTypeChange('dishes')}
        >
          <Text
            style={[
              styles.typeButtonText,
              searchType === 'dishes' && styles.typeButtonTextActive,
            ]}
          >
            Dishes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  container: {
    marginVertical: spacing.md,
  },
  searchContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    marginLeft: spacing.sm,
    marginRight: spacing.sm,
    ...typography.body,
    color: colors.text.primary,
  },
  typeSelector: {
    flexDirection: 'row' as const,
    marginTop: spacing.sm,
  },
  typeButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    marginRight: spacing.sm,
    backgroundColor: colors.surface,
  },
  typeButtonActive: {
    backgroundColor: colors.primary,
  },
  typeButtonText: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  typeButtonTextActive: {
    color: colors.white,
    fontWeight: '600' as const,
  },
};
