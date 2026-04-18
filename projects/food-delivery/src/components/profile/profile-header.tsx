import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';
import styles from './profile-header.styles';

type User = {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
};

interface Props {
  user: User;
  onEditProfile: () => void;
}

export default function ProfileHeader({ user, onEditProfile }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {user?.avatar ? (
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          </View>
        )}
        <TouchableOpacity style={styles.editButton} onPress={onEditProfile}>
          <Ionicons name="camera-outline" size={16} color={colors.white} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.name}>{user?.name || 'Guest User'}</Text>
      <Text style={styles.email}>{user?.email || 'guest@example.com'}</Text>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Ionicons name="call-outline" size={16} color={colors.textLight} />
          <Text style={styles.infoText}>{user?.phone || '+1 234 567 8900'}</Text>
        </View>
      </View>
    </View>
  );
}
