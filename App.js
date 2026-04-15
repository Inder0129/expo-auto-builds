import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [display, setDisplay] = useState('0');
  const [expr, setExpr] = useState('');

  const press = (btn) => {
    if (btn === 'C') {
      setDisplay('0');
      setExpr('');
    } else if (btn === '=') {
      try {
        const evalExpr = (expr + display).replace(/×/g, '*').replace(/÷/g, '/');
        const res = eval(evalExpr);
        setDisplay(res.toString());
        setExpr('');
      } catch {
        setDisplay('Error');
      }
    } else if (['+','-','×','÷'].includes(btn)) {
      setExpr(expr + display + btn);
      setDisplay('0');
    } else {
      setDisplay(display === '0' ? btn : display + btn);
    }
  };

  const buttons = [
    ['C','÷','×','-'],
    ['7','8','9','+'],
    ['4','5','6','='],
    ['1','2','3'],
    ['0','.']
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{display}</Text>
      <View style={styles.buttons}>
        {buttons.flat().map((btn, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.button, btn === '=' && styles.equals, btn === '0' && styles.zero]}
            onPress={() => press(btn)}
          >
            <Text style={styles.buttonText}>{btn}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  display: { color: '#fff', fontSize: 72, textAlign: 'right', padding: 20 },
  buttons: { flexDirection: 'row', flexWrap: 'wrap' },
  button: { width: '25%', height: 80, justifyContent: 'center', alignItems: 'center', backgroundColor: '#333' },
  buttonText: { color: '#fff', fontSize: 24 },
  equals: { backgroundColor: '#f09a36' },
  zero: { width: '50%' }
});