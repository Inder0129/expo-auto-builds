import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IconButton } from '@/src/components/ui';
import { colors, spacing, typography } from '@/src/theme';
import { Album } from '@/src/types';

interface AlbumHeaderProps {
  album: Album;
  onClose: () => void;
}

export function AlbumHeader({ album, onClose }: AlbumHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton onPress={onClose}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </IconButton>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{album.name}</Text>
          <Text style={styles.subtitle}>{album.count} photos</Text>
        </View>
        <View style={styles.actions}>
          <IconButton onPress={() => {}}>
            <Ionicons name="search-outline" size={24} color={colors.text.primary} />
          </IconButton>
          <IconButton onPress={() => {}}>
            <Ionicons name="ellipsis-vertical" size={24} color={colors.text.primary} />
          </IconButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  titleContainer: {
    flex: 1,
    marginLeft: spacing.md,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
  },
  subtitle: {
    ...typography.body2,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
});