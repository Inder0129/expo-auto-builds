import React from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { useThemedStyles } from '@/theme';
import { createButtonsStyles } from './buttons.styles';

interface Props {
  onPress: (value: string) => void;
  onClear: () => void;
}

const Buttons = ({ onPress, onClear }: Props) => {
  const styles = useThemedStyles(createButtonsStyles);

  return (
    <View style={styles.container}>
      <Button title="7" onPress={() => onPress('7')} />
      <Button title="8" onPress={() => onPress('8')} />
      <Button title="9" onPress={() => onPress('9')} />
      <Button title="C" onPress={onClear} />
      <Button title="4" onPress={() => onPress('4')} />
      <Button title="5" onPress={() => onPress('5')} />
      <Button title="6" onPress={() => onPress('6')} />
      <Button title="=" onPress={() => onPress('=')} />
      <Button title="1" onPress={() => onPress('1')} />
      <Button title="2" onPress={() => onPress('2')} />
      <Button title="3" onPress={() => onPress('3')} />
      <Button title="0" onPress={() => onPress('0')} />
    </View>
  );
};

export { Buttons };