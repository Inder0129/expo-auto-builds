import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useCallback } from 'react';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';
import { ViewStyle, TextStyle } from 'react-native';

interface Category {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
}

interface CategoryGridProps {
  categories: Category[];
  onPress: (categoryId: string) => void;
  style?: ViewStyle;
}

interface CategoryItemProps {
  item: Category;
  onPress: (categoryId: string) => void;
}

function CategoryItem({ item, onPress }: CategoryItemProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.95);
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1);
    onPress(item.id);
  }, [scale, onPress, item.id]);

  const itemStyle: ViewStyle = {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    margin: spacing.xs,
    flex: 1,
    minWidth: 100,
    borderWidth: 1,
    borderColor: colors.border,
  };

  const nameStyle: TextStyle = {
    ...typography.caption,
    color: colors.textPrimary,
    marginTop: spacing.xs,
    textAlign: 'center',
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[itemStyle, animatedStyle]}>
        <Ionicons name={item.icon} size={24} color={colors.primary} />
        <Text style={nameStyle}>{item.name}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

export function CategoryGrid({ categories, onPress, style }: CategoryGridProps) {
  const containerStyle: ViewStyle = {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    ...style,
  };

  return (
    <View style={containerStyle}>
      <FlatList
        data={categories}
        renderItem={({ item }: { item: Category }) => (
          <CategoryItem item={item} onPress={onPress} />
        )}
        keyExtractor={(item: Category) => item.id}
        numColumns={3}
        scrollEnabled={false}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </View>
  );
}