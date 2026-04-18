import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

interface AnimatedSliderProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
}

export const AnimatedSlider: React.FC<AnimatedSliderProps> = ({ 
  label, 
  value, 
  onValueChange, 
  min, 
  max 
}) => {
  const sliderWidth = useSharedValue(0);
  const progress = useSharedValue(((value - min) / (max - min)) * 100);
  
  const trackAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  const knobAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: `${progress.value}%` }],
  }));

  const handleLayout = useCallback((event: any) => {
    sliderWidth.value = event.nativeEvent.layout.width;
  }, [sliderWidth]);

  const panGesture = Gesture.Pan()
    .onUpdate((event: any) => {
      if (sliderWidth.value > 0) {
        const newProgress = Math.max(0, Math.min(100, (event.translationX / sliderWidth.value) * 100 + progress.value));
        progress.value = newProgress;
        const newValue = min + (newProgress / 100) * (max - min);
        onValueChange(Math.round(newValue));
      }
    })
    .onEnd(() => {
      progress.value = withSpring(progress.value, {
        damping: 15,
        stiffness: 150,
      });
    });

  return (
    <View>
      {label ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm }}>
          <Text style={{ ...typography.body, color: colors.text.primary }}>{label}</Text>
          <Text style={{ ...typography.body, color: colors.primary }}>{Math.round(value)}%</Text>
        </View>
      ) : null}
      
      <View 
        style={{
          height: 40,
          justifyContent: 'center',
        }}
        onLayout={handleLayout}
      >
        <View style={{
          height: 6,
          backgroundColor: colors.surface,
          borderRadius: 3,
          overflow: 'hidden',
        }}>
          <Animated.View
            style={[
              {
                height: '100%',
                backgroundColor: colors.primary,
                borderRadius: 3,
              },
              trackAnimatedStyle
            ]}
          />
        </View>
        
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[
              {
                position: 'absolute',
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: colors.background,
                borderWidth: 3,
                borderColor: colors.primary,
                top: '50%',
                marginTop: -12,
                marginLeft: -12,
              },
              knobAnimatedStyle
            ]}
          />
        </GestureDetector>
      </View>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.xs }}>
        <Text style={{ ...typography.caption, color: colors.text.secondary }}>{min}</Text>
        <Text style={{ ...typography.caption, color: colors.text.secondary }}>{max}</Text>
      </View>
    </View>
  );
};
