import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IconButton } from '@/src/components/ui';
import { colors, spacing } from '@/src/theme';

interface Props {
  onEdit: () => void;
  onDelete: () => void;
  onShare: () => void;
  style?: any;
}

export const EditToolbar: React.FC<Props> = ({ onEdit, onDelete, onShare, style }) => {
  return (
    <View style={[{
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: spacing.lg,
      paddingHorizontal: spacing.md
    }, style]}>
      <IconButton 
        icon={<Ionicons name="create-outline" size={28} color={colors.primary} />}
        onPress={onEdit}
      />
      <IconButton 
        icon={<Ionicons name="share-outline" size={28} color={colors.primary} />}
        onPress={onShare}
      />
      <IconButton 
        icon={<Ionicons name="trash-outline" size={28} color={colors.error} />}
        onPress={onDelete}
      />
    </View>
  );
};
