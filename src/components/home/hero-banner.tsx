import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageStyle, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

interface HeroBannerProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  style?: ViewStyle;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ title, subtitle, imageUrl, style }) => {
  return (
    <View style={[containerStyle, style]}>
      <Image
        source={{ uri: imageUrl }}
        style={imageStyle}
        resizeMode="cover"
      />
      <View style={overlayStyle}>
        <Text style={titleStyle}>{title}</Text>
        <Text style={subtitleStyle}>{subtitle}</Text>
        <TouchableOpacity style={buttonStyle} onPress={() => console.log('Explore pressed')}>
          <Text style={buttonTextStyle}>Explore Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const containerStyle: ViewStyle = {
  height: 250,
  position: 'relative',
};

const imageStyle: ImageStyle = {
  width: '100%',
  height: '100%',
};

const overlayStyle: ViewStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  justifyContent: 'center',
  alignItems: 'center',
  padding: spacing.lg,
};

const titleStyle: TextStyle = {
  ...typography.h1,
  color: colors.background,
  textAlign: 'center',
  marginBottom: spacing.sm,
};

const subtitleStyle: TextStyle = {
  ...typography.body,
  color: colors.background,
  textAlign: 'center',
  marginBottom: spacing.lg,
};

const buttonStyle: ViewStyle = {
  backgroundColor: colors.primary,
  paddingHorizontal: spacing.xl,
  paddingVertical: spacing.md,
  borderRadius: 8,
};

const buttonTextStyle: TextStyle = {
  ...typography.body,
  color: colors.background,
  fontWeight: '600',
};
