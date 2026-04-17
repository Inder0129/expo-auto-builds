import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { IconButton } from '../ui';
import { colors } from '../../theme';
import styles from '../../styles/gallery';

type HeaderProps = {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
};

export function Header({ title, showBack = false, onBackPress }: HeaderProps) {
  return (
    <View style={styles.header}>
      {showBack && (
        <IconButton onPress={onBackPress}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </IconButton>
      )}
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.text }}>
        {title}
      </Text>
    </View>
  );
}
