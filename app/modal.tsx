import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { createModalStyles } from '@/src/styles/modal';
import { useThemeColors } from '@/src/theme';
import { Button, Card, WrapperView } from '@/src/components/ui';
import { Icon } from '@/src/components/icons';
import { ModalContainer } from '@/src/components/modal';

export default function ModalScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const styles = createModalStyles(colors);

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <ModalContainer>
      <WrapperView style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Advanced Features</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Icon name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <Text style={styles.text}>Additional calculator features will appear here.</Text>
            <Button title="Close" onPress={handleClose} style={styles.button} />
          </View>
        </Card>
      </WrapperView>
    </ModalContainer>
  );
}
