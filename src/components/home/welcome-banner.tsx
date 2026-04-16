import React from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles } from '@/theme';
import { Card } from '@/components/ui';
import createWelcomeBannerStyles from './welcome-banner-styles';

type Props = {
  userName: string;
};

const WelcomeBanner: React.FC<Props> = ({ userName }) => {
  const styles = useThemedStyles(createWelcomeBannerStyles);
  
  return (
    <Card style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome back,</Text>
        <Text style={styles.userName}>{userName}!</Text>
        <Text style={styles.subtitle}>Here's your dashboard overview</Text>
      </View>
    </Card>
  );
};

export default WelcomeBanner;