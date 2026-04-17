import { Button } from '@/src/components/ui';
import { colors } from '@/src/theme/colors';

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
