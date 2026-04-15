import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [current, setCurrent] = useState('0');
  const [previous, setPrevious] = useState(null);
  const [operation, setOperation] = useState(null);

  const handleNumber = (num) => {
    if (current === '0') {
      setCurrent(num.toString());
    } else {
      setCurrent(current + num);
    }
  };

  const handleOperator = (op) => {
    setPrevious(current);
    setOperation(op);
    setCurrent('0');
  };

  const calculate = () => {
    const prev = parseFloat(previous);
    const curr = parseFloat(current);
    let result;

    switch (operation) {
      case '+':
        result = prev + curr;
        break;
      case '-':
        result = prev - curr;
        break;
      case '*':
        result = prev * curr;
        break;
      case '/':
        result = prev / curr;
        break;
      default:
        return;
    }

    setCurrent(result.toString());
    setPrevious(null);
    setOperation(null);
  };

  const clear = () => {
    setCurrent('0');
    setPrevious(null);
    setOperation(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{current}</Text>
      </View>
      <View style={styles.buttons}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleNumber('7')}><Text>7</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumber('8')}><Text>8</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumber('9')}><Text>9</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleOperator('/')}><Text>/</Text></TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleNumber('4')}><Text>4</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumber('5')}><Text>5</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumber('6')}><Text>6</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleOperator('*')}><Text>*</Text></TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleNumber('1')}><Text>1</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumber('2')}><Text>2</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumber('3')}><Text>3</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleOperator('-')}><Text>-</Text></TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleNumber('0')}><Text>0</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={clear}><Text>C</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={calculate}><Text>=</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleOperator('+')}><Text>+</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
  display: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
  },
  displayText: {
    fontSize: 48,
  },
  buttons: {
    flex: 2,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
