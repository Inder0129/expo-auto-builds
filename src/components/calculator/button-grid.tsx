import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useThemedStyles } from '@/theme';
import createButtonGridStyles from '@/styles/button-grid';

interface ButtonGridProps {
  onPress: (value: string) => void;
}

const ButtonGrid = ({ onPress }: ButtonGridProps) => {
  const styles = useThemedStyles(createButtonGridStyles);
  const buttons = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'];

  return (
    <View style={styles.grid}>
      {buttons.map((button, index) => (
        <TouchableOpacity key={index} style={styles.button} onPress={() => onPress(button)}>
          <Text style={styles.buttonText}>{button}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ButtonGrid;