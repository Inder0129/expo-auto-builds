import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useThemedStyles } from '@/theme';
import { Card } from '@/components/ui';
import { Icon } from '@/components/icons';
import createSettingsListStyles from './settings-list-styles';

type Setting = {
  id: string;
  title: string;
  icon: string;
};

type Props = {
  settings: Setting[];
  onSettingPress: (settingId: string) => void;
};

const SettingsList: React.FC<Props> = ({ settings, onSettingPress }) => {
  const styles = useThemedStyles(createSettingsListStyles);
  
  return (
    <View style={styles.container}>
      {settings.map((setting) => (
        <TouchableOpacity
          key={setting.id}
          onPress={() => onSettingPress(setting.id)}
        >
          <Card style={styles.card}>
            <View style={styles.settingContent}>
              <Icon name={setting.icon} size={24} style={styles.icon} />
              <Text style={styles.settingTitle}>{setting.title}</Text>
              <Icon name="chevron-right" size={20} style={styles.chevron} />
            </View>
          </Card>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SettingsList;