import React from 'react';
import { Slider, Text } from 'react-native';
import { useThemedStyles } from '@/theme';
import createSettingSliderStyles from '@/styles/setting-slider';

interface Props {
  onValueChange: (value: number) => void;
}

const SettingSlider = ({ onValueChange }: Props) => {
  const styles = useThemedStyles(createSettingSliderStyles);
  const [value, setValue] = React.useState(0);

  const handleValueChange = (val: number) => {
    setValue(val);
    onValueChange(val);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Slider Setting</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        value={value}
        onValueChange={handleValueChange}
      />
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default SettingSlider;