import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [display, setDisplay] = useState('0');
  const [current, setCurrent] = useState('');
  const [operator, setOperator] = useState(null);
  const [previous, setPrevious] = useState('');

  const addNumber = (num) => {
    const newCurrent = current === '0' ? num : current + num;
    setCurrent(newCurrent);
    setDisplay(newCurrent);
  };

  const addOperator = (op) => {
    if (current === '') return;
    if (previous && operator) calculate();
    setOperator(op);
    setPrevious(current || previous);
    setCurrent('');
  };

  const calculate = () => {
    if (!operator || previous === '' || current === '') return;
    const a = parseFloat(previous), b = parseFloat(current);
    let result;
    switch (operator) {
      case '+': result = a + b; break;
      case '-': result = a - b; break;
      case '*': result = a * b; break;
      case '/': result = b !== 0 ? a / b : 0; break;
    }
    const resultStr = result.toString();
    setDisplay(resultStr);
    setCurrent(resultStr);
    setOperator(null);
    setPrevious('');
  };

  const clear = () => {
    setDisplay('0');
    setCurrent('');
    setOperator(null);
    setPrevious('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{display}</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={clear}><Text style={styles.text}>C</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => addOperator('/')}><Text style={styles.text}>/</Text></TouchableOpacity>
      </View>
      <View style={styles.row}>
        {[7,8,9].map(n => <TouchableOpacity key={n} style={styles.button} onPress={() => addNumber(n.toString())}><Text style={styles.text}>{n}</Text></TouchableOpacity>)}
        <TouchableOpacity style={styles.button} onPress={() => addOperator('*')}><Text style={styles.text}>*</Text></TouchableOpacity>
      </View>
      <View style={styles.row}>
        {[4,5,6].map(n => <TouchableOpacity key={n} style={styles.button} onPress={() => addNumber(n.toString())}><Text style={styles.text}>{n}</Text></TouchableOpacity>)}
        <TouchableOpacity style={styles.button} onPress={() => addOperator('-')}><Text style={styles.text}>-</Text></TouchableOpacity>
      </View>
      <View style={styles.row}>
        {[1,2,3].map(n => <TouchableOpacity key={n} style={styles.button} onPress={() => addNumber(n.toString())}><Text style={styles.text}>{n}</Text></TouchableOpacity>)}
        <TouchableOpacity style={styles.button} onPress={() => addOperator('+')}><Text style={styles.text}>+</Text></TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.buttonZero} onPress={() => addNumber('0')}><Text style={styles.text}>0</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => addNumber('.')}><Text style={styles.text}>.</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={calculate}><Text style={styles.text}>=</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', backgroundColor: '#000', padding: 20 },
  display: { fontSize: 60, color: '#fff', textAlign: 'right', marginBottom: 20, height: 80 },
  row: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  button: { backgroundColor: '#333', padding: 20, borderRadius: 40, flex: 1, margin: 5, alignItems: 'center' },
  buttonZero: { backgroundColor: '#333', padding: 20, borderRadius: 40, flex: 2, margin: 5, alignItems: 'center' },
  text: { fontSize: 30, color: '#fff' }
});