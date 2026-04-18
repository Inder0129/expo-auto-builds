import React, { useCallback } from 'react';
import { View, Text, Switch } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';
import { AnimatedSlider } from './animated-slider';

interface SettingsItem {
  id: string;
  title: string;
  description: string;
  type: 'toggle' | 'slider' | 'select';
  value: boolean | number;
}

interface SettingsListProps {
  items: SettingsItem[];
  onToggleChange: (id: string, value: boolean) => void;
  onSliderChange: (id: string, value: number) => void;
}

export const SettingsList: React.FC<SettingsListProps> = ({ items, onToggleChange, onSliderChange }) => {
  const handleTogglePress = useCallback((id: string, currentValue: boolean) => {
    onToggleChange(id, !currentValue);
  }, [onToggleChange]);

  const handleSliderValueChange = useCallback((id: string, value: number) => {
    onSliderChange(id, value);
  }, [onSliderChange]);

  return (
    <View>
      {items.map((item: SettingsItem) => {
        const itemScale = useSharedValue(1);
        const itemAnimatedStyle = useAnimatedStyle(() => ({
          transform: [{ scale: itemScale.value }],
        }));

        const handleItemPress = useCallback(() => {
          itemScale.value = withTiming(0.95, { duration: 100 }, () => {
            itemScale.value = withTiming(1, { duration: 100 });
          });
        }, [itemScale]);

        return (
          <Animated.View 
            key={item.id} 
            style={[
              {
                paddingVertical: spacing.md,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              },
              itemAnimatedStyle
            ]}
            onTouchStart={handleItemPress}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ ...typography.h4, color: colors.text.primary, marginBottom: spacing.xs }}>
                  {item.title}
                </Text>
                <Text style={{ ...typography.caption, color: colors.text.secondary }}>
                  {item.description}
                </Text>
              </View>
              
              {item.type === 'toggle' && (
                <Switch
                  value={item.value as boolean}
                  onValueChange={(value: boolean) => handleTogglePress(item.id, value)}
                  trackColor={{ false: colors.surface, true: colors.primary }}
                  thumbColor={colors.background}
                />
              )}
            </View>
            
            {item.type === 'slider' && (
              <View style={{ marginTop: spacing.md }}>
                <AnimatedSlider
                  label=""
                  value={item.value as number}
                  onValueChange={(value: number) => handleSliderValueChange(item.id, value)}
                  min={0}
                  max={100}
                />
              </View>
            )}
          </Animated.View>
        );
      })}
    </View>
  );
};
