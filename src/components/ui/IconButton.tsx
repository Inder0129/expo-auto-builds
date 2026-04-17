import { Pressable } from 'react-native';
import { colors } from '../../theme/colors';

type IconButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
};

export function IconButton({ children, onPress }: IconButtonProps) {
  return (
    <Pressable onPress={onPress} style={{ padding: 8 }}>
      {children}
    </Pressable>
  );
}