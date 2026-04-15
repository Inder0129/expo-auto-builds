import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(0);

  const calculate = (op) => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    let res = 0;
    switch(op) {
      case '+': res = n1 + n2; break;
      case '-': res = n1 - n2; break;
      case '*': res = n1 * n2; break;
      case '/': res = n2 !== 0 ? n1 / n2 : 'Error'; break;
    }
    setResult(res);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.result}>{result}</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={num1} onChangeText={setNum1} />
      <TextInput style={styles.input} keyboardType="numeric" value={num2} onChangeText={setNum2} />
      <View style={styles.buttons}>
        <Button title="+" onPress={() => calculate('+')} />
        <Button title="-" onPress={() => calculate('-')} />
        <Button title="*" onPress={() => calculate('*')} />
        <Button title="/" onPress={() => calculate('/')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  result: { fontSize: 40, marginBottom: 20 },
  input: { width: 200, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, textAlign: 'center' },
  buttons: { flexDirection: 'row', justifyContent: 'space-around', width: 200 }
});