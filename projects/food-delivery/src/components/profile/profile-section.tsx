import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
  onEdit?: () => void;
  style?: ViewStyle;
}

export function ProfileSection(props: ProfileSectionProps) {
  return (
    <View style={[{
      backgroundColor: '#ffffff',
      borderRadius: 12,
      marginHorizontal: 16,
      overflow: 'hidden',
    }, props.style]}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
      }}>
        <Text style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#000000',
        }}>
          {props.title}
        </Text>
        {props.onEdit && (
          <TouchableOpacity onPress={props.onEdit}>
            <Ionicons name="create-outline" size={20} color="#ff6b35" />
          </TouchableOpacity>
        )}
      </View>
      <View style={{ padding: 16 }}>
        {props.children}
      </View>
    </View>
  );
}