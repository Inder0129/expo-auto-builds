import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { spacing } from '@/src/theme';

interface Props {
  style?: any;
}

export const SuccessAnimation: React.FC<Props> = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.circle}>
        <Ionicons name="checkmark" size={64} color={colors.white} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
