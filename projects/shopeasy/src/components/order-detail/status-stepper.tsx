import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/src/theme';

type StatusType = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface StatusStepperProps {
  currentStatus: StatusType;
}

const statusOrder: StatusType[] = ['pending', 'processing', 'shipped', 'delivered'];
const statusLabels: Record<StatusType, string> = {
  pending: 'Pending',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export const StatusStepper: React.FC<StatusStepperProps> = ({ currentStatus }) => {
  const currentIndex = statusOrder.indexOf(currentStatus);
  
  return (
    <View style={styles.container}>
      {statusOrder.map((status: StatusType, index: number) => {
        const isCompleted = index <= currentIndex;
        const isCurrent = status === currentStatus;
        
        return (
          <View key={status} style={styles.stepContainer}>
            <View style={[
              styles.stepCircle,
              isCompleted ? styles.stepCircleCompleted : styles.stepCirclePending,
              isCurrent && styles.stepCircleCurrent,
            ]}>
              {isCompleted && (
                <View style={styles.stepInnerCircle} />
              )}
            </View>
            <Text style={[
              styles.stepLabel,
              isCompleted ? styles.stepLabelCompleted : styles.stepLabelPending,
            ]}>
              {statusLabels[status]}
            </Text>
            {index < statusOrder.length - 1 && (
              <View style={[
                styles.connectorLine,
                isCompleted ? styles.connectorLineCompleted : styles.connectorLinePending,
              ]} />
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  stepContainer: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepCirclePending: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
  },
  stepCircleCompleted: {
    backgroundColor: colors.primary,
  },
  stepCircleCurrent: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  stepInnerCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.white,
  },
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  stepLabelPending: {
    color: colors.text.secondary,
  },
  stepLabelCompleted: {
    color: colors.text.primary,
    fontWeight: '500',
  },
  connectorLine: {
    position: 'absolute',
    top: 11,
    left: '60%',
    right: '-60%',
    height: 2,
  },
  connectorLinePending: {
    backgroundColor: colors.border,
  },
  connectorLineCompleted: {
    backgroundColor: colors.primary,
  },
});
