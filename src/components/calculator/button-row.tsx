import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useThemedStyles } from '@/theme';
import createButtonRowStyles from '@/styles/button-row';

interface ButtonRowProps {
  onPress: (number: string) => void;
  operation?: boolean;
  equals?: boolean;
}

const ButtonRow = ({ onPress, operation, equals }: ButtonRowProps) => {
  const styles = useThemedStyles(createButtonRowStyles);
  const buttons = operation ? ['+', '-', '*', '/'] : equals ? ['='] : ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  return (
    <View style={styles.container}>
      {buttons.map((button, index) => (
        <TouchableOpacity key={index} style={styles.button} onPress={() => onPress(button)}>
          <Text style={styles.buttonText}>{button}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ButtonRow;