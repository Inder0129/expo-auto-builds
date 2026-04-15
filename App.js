import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default function App() {
  const [currentInput, setCurrentInput] = useState('0');
  const [previousInput, setPreviousInput] = useState('');
  const [operator, setOperator] = useState(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const handleNumberPress = (number) => {
    if (shouldResetDisplay) {
      setCurrentInput(number);
      setShouldResetDisplay(false);
    } else {
      setCurrentInput(currentInput === '0' ? number : currentInput + number);
    }
  };

  const handleOperatorPress = (op) => {
    setPreviousInput(currentInput);
    setOperator(op);
    setShouldResetDisplay(true);
  };

  const handleEqualPress = () => {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;

    switch (operator) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '×':
        result = prev * current;
        break;
      case '÷':
        result = prev / current;
        break;
      default:
        return;
    }

    if (isFinite(result)) {
      setCurrentInput(result.toString());
    } else {
      setCurrentInput('Error');
    }
    setOperator(null);
    setPreviousInput('');
    setShouldResetDisplay(true);
  };

  const handleClear = () => {
    setCurrentInput('0');
    setPreviousInput('');
    setOperator(null);
    setShouldResetDisplay(false);
  };

  const handleDecimal = () => {
    if (shouldResetDisplay) {
      setCurrentInput('0.');
      setShouldResetDisplay(false);
    } else if (!currentInput.includes('.')) {
      setCurrentInput(currentInput + '.');
    }
  };

  const buttons = [
    { label: 'C', type: 'clear' },
    { label: '÷', type: 'operator' },
    { label: '×', type: 'operator' },
    { label: '7', type: 'number' },
    { label: '8', type: 'number' },
    { label: '9', type: 'number' },
    { label: '-', type: 'operator' },
    { label: '4', type: 'number' },
    { label: '5', type: 'number' },
    { label: '6', type: 'number' },
    { label: '+', type: 'operator' },
    { label: '1', type: 'number' },
    { label: '2', type: 'number' },
    { label: '3', type: 'number' },
    { label: '=', type: 'equal', doubleWidth: false },
    { label: '0', type: 'number', doubleWidth: true },
    { label: '.', type: 'decimal' },
  ];

  const handleButtonPress = (button) => {
    switch (button.type) {
      case 'number':
        handleNumberPress(button.label);
        break;
      case 'operator':
        handleOperatorPress(button.label);
        break;
      case 'equal':
        handleEqualPress();
        break;
      case 'clear':
        handleClear();
        break;
      case 'decimal':
        handleDecimal();
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
          {currentInput}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              button.type === 'operator' && styles.operatorButton,
              button.type === 'clear' && styles.clearButton,
              button.type === 'equal' && styles.equalButton,
              button.doubleWidth && styles.doubleWidth,
            ]}
            onPress={() => handleButtonPress(button)}
          >
            <Text style={styles.buttonText}>{button.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  display: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  displayText: {
    color: '#fff',
    fontSize: 80,
    fontWeight: '300',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 20,
  },
  button: {
    width: windowWidth / 4,
    height: windowWidth / 4,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: windowWidth / 8,
    margin: 5,
  },
  doubleWidth: {
    width: (windowWidth / 2) + 5,
  },
  operatorButton: {
    backgroundColor: '#ff9500',
  },
  clearButton: {
    backgroundColor: '#a5a5a5',
  },
  equalButton: {
    backgroundColor: '#ff9500',
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '400',
  },
});