import { TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useCallback } from 'react';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { ViewStyle } from 'react-native';

interface FloatingActionButtonProps {
  onPress: () => void;
  style?: ViewStyle;
}

export function FloatingActionButton({ onPress, style }: FloatingActionButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = useCallback(() => {
    scale.value = withSpring(0.9, { damping: 10 }, () => {
      scale.value = withSpring(1);
    });
    onPress();
  }, [scale, onPress]);

  const buttonStyle: ViewStyle = {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    ...style,
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
      <Animated.View style={[buttonStyle, animatedStyle]}>
        <Ionicons name="add" size={24} color={colors.white} />
      </Animated.View>
    </TouchableOpacity>
  );
}