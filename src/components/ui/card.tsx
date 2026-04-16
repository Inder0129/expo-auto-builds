import React from 'react';
import { View } from 'react-native';
import { useThemedStyles, moderateScaleFactor, spacing } from '@/theme';

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  const styles = useThemedStyles();

  return <View style={styles.card}>{children}</View>;
};

export default Card;