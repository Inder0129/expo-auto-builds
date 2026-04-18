import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

interface ThemeOption {
  id: string;
  label: string;
  value: 'light' | 'dark' | 'auto';
}

export const ThemeToggle: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<string>('auto');
  const knobPosition = useSharedValue(0);
  
  const themes: ThemeOption[] = [
    { id: '1', label: 'Light', value: 'light' },
    { id: '2', label: 'Dark', value: 'dark' },
    { id: '3', label: 'Auto', value: 'auto' },
  ];

  const knobWidth = 100 / themes.length;
  
  const knobAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: `${knobPosition.value}%` }],
    width: `${knobWidth}%`,
  }));

  const handleThemeSelect = useCallback((themeId: string, index: number) => {
    setSelectedTheme(themeId);
    knobPosition.value = withSpring(index * knobWidth, {
      damping: 15,
      stiffness: 150,
    });
  }, [knobPosition, knobWidth]);

  return (
    <View>
      <View style={{
        flexDirection: 'row',
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: 4,
        position: 'relative',
      }}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 4,
              bottom: 4,
              left: 4,
              backgroundColor: colors.primary,
              borderRadius: 8,
            },
            knobAnimatedStyle
          ]}
        />
        
        {themes.map((theme: ThemeOption, index: number) => (
          <TouchableOpacity
            key={theme.id}
            style={{
              flex: 1,
              paddingVertical: spacing.sm,
              paddingHorizontal: spacing.md,
              alignItems: 'center',
              zIndex: 1,
            }}
            onPress={() => handleThemeSelect(theme.id, index)}
            activeOpacity={0.7}
          >
            <Text style={{
              ...typography.button,
              color: selectedTheme === theme.id ? colors.background : colors.text.secondary,
            }}>
              {theme.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={{
        ...typography.caption,
        color: colors.text.secondary,
        marginTop: spacing.sm,
        textAlign: 'center',
      }}>
        Selected: {themes.find((t: ThemeOption) => t.id === selectedTheme)?.label}
      </Text>
    </View>
  );
};
