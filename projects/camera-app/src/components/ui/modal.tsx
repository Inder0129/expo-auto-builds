import { View, Text, StyleSheet, Modal as RNModal, TouchableOpacity, ViewStyle } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';
import { Button } from './button';

interface ModalProps {
  visible: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  primaryAction?: {
    label: string;
    onPress: () => void;
  };
  secondaryAction?: {
    label: string;
    onPress: () => void;
  };
  style?: ViewStyle;
}

export function Modal(props: ModalProps) {
  return (
    <RNModal
      visible={props.visible}
      transparent={true}
      animationType="fade"
      onRequestClose={props.onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, props.style]}>
          <View style={styles.header}>
            <Text style={styles.title}>{props.title}</Text>
            <TouchableOpacity onPress={props.onClose}>
              <Text style={styles.close}>×</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>{props.children}</View>
          {(props.primaryAction || props.secondaryAction) && (
            <View style={styles.actions}>
              {props.secondaryAction && (
                <Button
                  title={props.secondaryAction.label}
                  onPress={props.secondaryAction.onPress}
                  variant="outline"
                  style={styles.secondaryButton}
                />
              )}
              {props.primaryAction && (
                <Button
                  title={props.primaryAction.label}
                  onPress={props.primaryAction.onPress}
                />
              )}
            </View>
          )}
        </View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.large,
  },
  container: {
    backgroundColor: colors.background,
    borderRadius: 12,
    width: '100%',
    maxWidth: 400,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.large,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  title: {
    ...typography.h3,
    color: colors.text,
  },
  close: {
    fontSize: 24,
    color: colors.gray,
  },
  content: {
    padding: spacing.large,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.medium,
    padding: spacing.large,
    borderTopWidth: 1,
    borderTopColor: colors.surface,
  },
  secondaryButton: {
    marginRight: 'auto',
  },
});