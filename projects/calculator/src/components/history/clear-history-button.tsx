import { Button } from '../ui/button';
import { colors } from '../../theme/colors';

type ClearHistoryButtonProps = {
  onPress: () => void;
};

export function ClearHistoryButton({ onPress }: ClearHistoryButtonProps) {
  return (
    <Button
      title="Clear History"
      onPress={onPress}
      style={{ backgroundColor: colors.error }}
    />
  );
}