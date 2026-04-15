import React from 'react';
import { TabBar } from 'react-native';
import { useThemedStyles } from '../../theme/index';

export const TabsLayout = ({ children }) => {
  const { colors, typography, spacing } = useThemedStyles();
  return (
    <React.Fragment>
      {children}
      <TabBar style={{ backgroundColor: colors.background }} />
    </React.Fragment>
  );
};