import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { useThemedStyles } from '@/theme';
import { WelcomeBanner, QuickActions } from '@/components/home';
import { WrapperView } from '@/components/ui';
import createHomeStyles from '@/styles/homeStyles';

type Props = {};

const HomeScreen: React.FC<Props> = () => {
  const styles = useThemedStyles(createHomeStyles);
  
  const handleActionPress = useCallback((actionId: string) => {
    console.log('Action pressed:', actionId);
  }, []);
  
  const quickActions = useMemo(() => [
    { id: '1', title: 'Explore', icon: 'compass' },
    { id: '2', title: 'Profile', icon: 'user' },
    { id: '3', title: 'Settings', icon: 'settings' },
  ], []);
  
  return (
    <WrapperView>
      <View style={styles.container}>
        <WelcomeBanner userName="User" />
        <QuickActions actions={quickActions} onActionPress={handleActionPress} />
      </View>
    </WrapperView>
  );
};

export default HomeScreen;