import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { User } from '@/src/store/slices/auth';
import { Input } from '@/src/components/ui/Input';
import styles from './profile-header.styles';

type ProfileHeaderProps = {
  user: User;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
};

export function ProfileHeader({ user, isEditing, onEdit, onSave }: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.avatarContainer}>
          {user.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {user.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.infoContainer}>
          {isEditing ? (
            <>
              <Input
                placeholder="Name"
                value={user.name}
                style={styles.input}
              />
              <Input
                placeholder="Email"
                value={user.email}
                style={styles.input}
                keyboardType="email-address"
              />
              <Input
                placeholder="Phone"
                value={user.phone}
                style={styles.input}
                keyboardType="phone-pad"
              />
            </>
          ) : (
            <>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.email}>{user.email}</Text>
              <Text style={styles.phone}>{user.phone}</Text>
            </>
          )}
        </View>
      </View>
      <View style={styles.actionRow}>
        {isEditing ? (
          <TouchableOpacity style={styles.saveButton} onPress={onSave}>
            <Ionicons name="checkmark" size={20} color="white" />
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.editButton} onPress={onEdit}>
            <Ionicons name="pencil" size={16} color="#666" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
