import React from 'react';
import { Text as RNText, TextProps } from 'react-native';
import { useThemedStyles } from '../../theme';

type CustomTextProps = TextProps & {
  variant?: keyof ReturnType<typeof useThemedStyles>['text'];
};

export function Text({ style, variant = 'body', ...props }: CustomTextProps) {
  const styles = useThemedStyles((theme) => ({
    text: {
      ...theme.typography[variant]
    }
  }));

  return <RNText style={[styles.text, style]} {...props} />;
}
