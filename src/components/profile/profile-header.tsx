import React from 'react';
import { View, Text, Image } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';
import styles from './profile-header.styles';

interface Props {
  name: string;
  email: string;
  phone: string;
}

export const ProfileHeader: React.FC<Props> = ({ name, email, phone }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://via.placeholder.com/100' }}
        style={styles.avatar}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
        <Text style={styles.phone}>{phone}</Text>
      </View>
    </View>
  );
};
