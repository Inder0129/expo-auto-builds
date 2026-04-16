import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useThemedStyles } from '@/theme';
import { Icon } from '@/components/icons';
import createQuickActionsStyles from './quick-actions-styles';

type Action = {
  id: string;
  title: string;
  icon: string;
};

type Props = {
  actions: Action[];
  onActionPress: (actionId: string) => void;
};

const QuickActions: React.FC<Props> = ({ actions, onActionPress }) => {
  const styles = useThemedStyles(createQuickActionsStyles);
  
  return (
    <View style={styles.container}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.id}
          style={styles.actionItem}
          onPress={() => onActionPress(action.id)}
        >
          <View style={styles.iconContainer}>
            <Icon name={action.icon} size={24} />
          </View>
          <Text style={styles.actionTitle}>{action.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default QuickActions;