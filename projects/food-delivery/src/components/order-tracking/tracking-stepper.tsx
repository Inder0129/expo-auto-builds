import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';

interface TrackingStepperProps {
  steps: Array<{
    id: string;
    title: string;
    description: string;
    completed: boolean;
    time?: string;
  }>;
  style?: ViewStyle;
}

const TrackingStepper: React.FC<TrackingStepperProps> = ({ steps, style }) => {
  return (
    <View style={[styles.container, style]}>
      {steps.map((step: any, index: number) => (
        <View key={step.id} style={styles.stepContainer}>
          <View style={styles.stepIconContainer}>
            <View style={[
              styles.iconCircle,
              step.completed ? styles.completedIcon : styles.pendingIcon
            ]}>
              {step.completed ? (
                <Ionicons name="checkmark" size={16} color={colors.white} />
              ) : (
                <Text style={styles.stepNumber}>{index + 1}</Text>
              )}
            </View>
            {index < steps.length - 1 && (
              <View style={[
                styles.connector,
                step.completed ? styles.completedConnector : styles.pendingConnector
              ]} />
            )}
          </View>

          <View style={styles.stepContent}>
            <View style={styles.stepHeader}>
              <Text style={[
                styles.stepTitle,
                step.completed ? styles.completedText : styles.pendingText
              ]}>
                {step.title}
              </Text>
              {step.time && (
                <Text style={styles.stepTime}>{step.time}</Text>
              )}
            </View>
            <Text style={styles.stepDescription}>{step.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 24
  },
  stepIconContainer: {
    alignItems: 'center',
    marginRight: 12
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  },
  completedIcon: {
    backgroundColor: colors.primary
  },
  pendingIcon: {
    backgroundColor: colors.border
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary
  },
  connector: {
    width: 2,
    height: 40,
    position: 'absolute',
    top: 32,
    left: 15
  },
  completedConnector: {
    backgroundColor: colors.primary
  },
  pendingConnector: {
    backgroundColor: colors.border
  },
  stepContent: {
    flex: 1
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1
  },
  completedText: {
    color: colors.textPrimary
  },
  pendingText: {
    color: colors.textSecondary
  },
  stepTime: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 8
  },
  stepDescription: {
    fontSize: 14,
    color: colors.textSecondary
  }
});

export default TrackingStepper;