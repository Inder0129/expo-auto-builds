import React from 'react';
import { View, Text, Slider } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Adjustment } from '@/src/types';
import { colors, spacing } from '@/src/theme';

interface Props {
  adjustments: Adjustment;
  onChange: (key: keyof Adjustment, value: number) => void;
  style?: any;
}

const adjustmentConfigs: { key: keyof Adjustment; label: string; icon: keyof typeof Ionicons.glyphMap; min: number; max: number }[] = [
  { key: 'brightness', label: 'Brightness', icon: 'sunny', min: -100, max: 100 },
  { key: 'contrast', label: 'Contrast', icon: 'contrast', min: -100, max: 100 },
  { key: 'saturation', label: 'Saturation', icon: 'color-palette', min: -100, max: 100 },
  { key: 'warmth', label: 'Warmth', icon: 'flame', min: -100, max: 100 }
];

export const AdjustmentSliders: React.FC<Props> = ({ adjustments, onChange, style }) => {
  return (
    <View style={[{
      marginTop: spacing.lg
    }, style]}>
      <Text style={{
        fontSize: 16,
        fontWeight: '600',
        color: colors.text.primary,
        marginBottom: spacing.md
      }}>
        Adjustments
      </Text>
      
      {adjustmentConfigs.map((config) => (
        <View key={config.key} style={{
          marginBottom: spacing.md
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: spacing.xs
          }}>
            <Ionicons name={config.icon} size={20} color={colors.text.secondary} />
            <Text style={{
              marginLeft: spacing.sm,
              fontSize: 14,
              color: colors.text.secondary,
              flex: 1
            }}>
              {config.label}
            </Text>
            <Text style={{
              fontSize: 14,
              color: colors.text.primary,
              fontWeight: '500'
            }}>
              {adjustments[config.key]}
            </Text>
          </View>
          
          <Slider
            value={adjustments[config.key]}
            onValueChange={(value: number): void => onChange(config.key, value)}
            minimumValue={config.min}
            maximumValue={config.max}
            step={1}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor={colors.border}
            thumbTintColor={colors.primary}
          />
        </View>
      ))}
    </View>
  );
};
