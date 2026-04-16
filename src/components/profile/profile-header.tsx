import React from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles } from '@/theme';
import { Card } from '@/components/ui';
import { Icon } from '@/components/icons';
import createProfileHeaderStyles from './profile-header-styles';

type Props = {
  userName: string;
  userEmail: string;
};

const ProfileHeader: React.FC<Props> = ({ userName, userEmail }) => {
  const styles = useThemedStyles(createProfileHeaderStyles);
  
  return (
    <Card style={styles.card}>
      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <Icon name="user" size={40} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>
      </View>
    </Card>
  );
};

export default ProfileHeader;