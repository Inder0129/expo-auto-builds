import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { Button } from '@/components/ui';
import { useThemedStyles } from '@/theme';
import { createAuthStyles } from '@/styles/authStyles';

type AuthFooterProps = {
  type: 'login' | 'register';
  onNavigate: () => void;
};

export const AuthFooter: React.FC<AuthFooterProps> = ({ type, onNavigate }) => {
  const styles = useThemedStyles(createAuthStyles);

  const handleNavigate = useCallback(() => {
    onNavigate();
  }, [onNavigate]);

  return (
    <View style={styles.container}>
      <Text>
        {type === 'login' ? "Don't have an account?" : "Already have an account?"}
      </Text>
      <Button
        title={type === 'login' ? 'Register' : 'Login'}
        onPress={handleNavigate}
        variant="text"
      />
    </View>
  );
};
