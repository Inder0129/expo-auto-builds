import { View, Text, TouchableOpacity } from 'react-native';
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

interface AnimatedCardProps {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress: () => void;
  style?: ViewStyle;
}

export function AnimatedCard({
  title,
  description,
  icon,
  color,
  onPress,
  style,
}: AnimatedCardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.95);
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1);
    onPress();
  }, [scale, onPress]);

  const containerStyle: ViewStyle = {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: color,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    ...style,
  };

  const titleStyle: TextStyle = {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  };

  const descriptionStyle: TextStyle = {
    ...typography.body,
    color: colors.textSecondary,
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[containerStyle, animatedStyle]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name={icon} size={24} color={color} style={{ marginRight: spacing.sm }} />
          <View style={{ flex: 1 }}>
            <Text style={titleStyle}>{title}</Text>
            <Text style={descriptionStyle}>{description}</Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}