import React from 'react';
import { View, ViewStyle } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

interface AnimatedFormProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const AnimatedForm: React.FC<AnimatedFormProps> = ({ children, style }) => {
  return (
    <Animated.View 
      entering={FadeInUp.delay(200).duration(800)}
      style={[{
        backgroundColor: 'transparent',
      }, style]}
    >
      {children}
    </Animated.View>
  );
};
