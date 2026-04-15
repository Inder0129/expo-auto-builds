import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [newInput, setNewInput] = useState(false);

  const input = (v: string) => {
    if (newInput) {
      setDisplay(v);
      setNewInput(false);
    } else {
      setDisplay(display === '0' ? v : display + v);
    }
  };

  const calculate = () => {
    if (op && memory !== null) {
      const curr = parseFloat(display);
      const result = op === '+' ? memory + curr : op === '-' ? memory - curr : op === '*' ? memory * curr : memory / curr;
      setDisplay(result.toString());
      setOp(null);
      setMemory(null);
      setNewInput(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setMemory(null);
    setOp(null);
  };

  return (
    <View style={s.container}>
      <Text style={s.display}>{display}</Text>
      <View style={s.buttons}>
        {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','C','+','='].map(b => (
          <TouchableOpacity key={b} style={[s.button, b === '=' && s.equals]} onPress={() => {
            if (b === 'C') clear();
            else if (b === '=') calculate();
            else if (['+','-','*','/'].includes(b)) {
              setMemory(parseFloat(display));
              setOp(b);
              setNewInput(true);
            } else if (b === '.') setDisplay(display.includes('.') ? display : display + '.');
            else input(b);
          }}>
            <Text style={s.buttonText}>{b}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  display: { fontSize: 60, color: '#fff', textAlign: 'right', padding: 20 },
  buttons: { flexDirection: 'row', flexWrap: 'wrap' },
  button: { width: '25%', padding: 20, backgroundColor: '#333', alignItems: 'center' },
  equals: { backgroundColor: '#f50', width: '50%' },
  buttonText: { fontSize: 30, color: '#fff' },
});