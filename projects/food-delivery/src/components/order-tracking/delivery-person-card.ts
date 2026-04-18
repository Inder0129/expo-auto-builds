import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';

interface DeliveryPerson {
  name: string;
  phone: string;
  rating: number;
  vehicle: string;
  eta: string;
}

interface DeliveryPersonCardProps {
  person: DeliveryPerson;
  onCall: () => void;
  onMessage: () => void;
  style?: ViewStyle;
}

const DeliveryPersonCard: React.FC<DeliveryPersonCardProps> = ({ person, onCall, onMessage, style }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.personInfo}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{person.name.charAt(0)}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.name}>{person.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color={colors.warning} />
            <Text style={styles.rating}>{person.rating.toFixed(1)}</Text>
          </View>
          <Text style={styles.vehicle}>{person.vehicle} • ETA: {person.eta}</Text>
        </View>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={onCall}>
          <Ionicons name="call" size={20} color={colors.primary} />
          <Text style={styles.actionText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onMessage}>
          <Ionicons name="chatbubble" size={20} color={colors.primary} />
          <Text style={styles.actionText}>Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border
  },
  personInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.background
  },
  details: {
    flex: 1
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  rating: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4
  },
  vehicle: {
    fontSize: 14,
    color: colors.textSecondary
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 6
  }
});

export default DeliveryPersonCard;