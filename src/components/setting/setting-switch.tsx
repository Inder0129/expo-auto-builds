import React from 'react';
import { Switch, Text } from 'react-native';
import { useThemedStyles } from '@/theme';
import createSettingSwitchStyles from '@/styles/setting-switch';

interface Props {
  onValueChange: (value: boolean) => void;
}

const SettingSwitch = ({ onValueChange }: Props) => {
  const styles = useThemedStyles(createSettingSwitchStyles);
  const [isEnabled, setIsEnabled] = React.useState(false);

  const toggleSwitch = () => {
    setIsEnabled((prevState) => !prevState);
    onValueChange(!isEnabled);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Switch Setting</Text>
      <Switch
        trackColor={{ false: '#ccc', true: '#6e3bff' }}
        thumbColor={isEnabled ? '#f5c52b' : '#f4f4f4'}
        ios_backgroundColor='#ccc'
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

export default SettingSwitch;