import { View, Text, Image } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withTiming,
  useSharedValue,
  withSequence,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

interface HeroBannerProps {
  style?: ViewStyle;
}

export function HeroBanner({ style }: HeroBannerProps) {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 1000 }),
        withTiming(0, { duration: 1000 })
      ),
      -1,
      true
    );
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );
  }, [translateY, opacity]);

  const containerStyle: ViewStyle = {
    backgroundColor: colors.primary,
    padding: spacing.xl,
    borderRadius: 16,
    margin: spacing.md,
    alignItems: 'center',
    ...style,
  };

  const titleStyle: TextStyle = {
    ...typography.h1,
    color: colors.white,
    marginBottom: spacing.sm,
    textAlign: 'center',
  };

  const subtitleStyle: TextStyle = {
    ...typography.body,
    color: colors.white,
    opacity: 0.9,
    textAlign: 'center',
  };

  const imageStyle: ImageStyle = {
    width: 120,
    height: 120,
    marginBottom: spacing.md,
    borderRadius: 60,
  };

  return (
    <Animated.View style={[containerStyle, animatedStyle]}>
      <Image
        source={{ uri: 'https://picsum.photos/200' }}
        style={imageStyle}
      />
      <Text style={titleStyle}>Welcome to AnimatedApp</Text>
      <Text style={subtitleStyle}>Experience smooth animations and beautiful interactions</Text>
    </Animated.View>
  );
}