import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { useThemedStyles } from '@/theme';
import { ProfileHeader, SettingsList } from '@/components/profile';
import { WrapperView } from '@/components/ui';
import createProfileStyles from '@/styles/profileStyles';

type Props = {};

const ProfileScreen: React.FC<Props> = () => {
  const styles = useThemedStyles(createProfileStyles);
  
  const handleSettingPress = useCallback((settingId: string) => {
    console.log('Setting pressed:', settingId);
  }, []);
  
  const settings = useMemo(() => [
    { id: '1', title: 'Account', icon: 'user' },
    { id: '2', title: 'Notifications', icon: 'bell' },
    { id: '3', title: 'Privacy', icon: 'lock' },
    { id: '4', title: 'Help', icon: 'help-circle' },
  ], []);
  
  return (
    <WrapperView>
      <View style={styles.container}>
        <ProfileHeader userName="John Doe" userEmail="john@example.com" />
        <SettingsList settings={settings} onSettingPress={handleSettingPress} />
      </View>
    </WrapperView>
  );
};

export default ProfileScreen;