import { View, TextInput } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';
import { ViewStyle, TextStyle } from 'react-native';

interface SearchBarProps {
  onSearch: (query: string) => void;
  style?: ViewStyle;
}

export function SearchBar({ onSearch, style }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const width = useSharedValue('100%');

  const animatedStyle = useAnimatedStyle(() => ({
    width: width.value,
  }));

  const handleFocus = useCallback(() => {
    width.value = withTiming('90%', { duration: 300 });
  }, [width]);

  const handleBlur = useCallback(() => {
    width.value = withTiming('100%', { duration: 300 });
  }, [width]);

  const handleChangeText = useCallback((text: string) => {
    setQuery(text);
    onSearch(text);
  }, [onSearch]);

  const containerStyle: ViewStyle = {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    ...style,
  };

  const inputContainerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  };

  const inputStyle: TextStyle = {
    flex: 1,
    ...typography.body,
    color: colors.textPrimary,
    marginLeft: spacing.sm,
  };

  return (
    <View style={containerStyle}>
      <Animated.View style={[inputContainerStyle, animatedStyle]}>
        <Ionicons name="search" size={20} color={colors.textSecondary} />
        <TextInput
          style={inputStyle}
          placeholder="Search animations..."
          placeholderTextColor={colors.textSecondary}
          value={query}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Animated.View>
    </View>
  );
}