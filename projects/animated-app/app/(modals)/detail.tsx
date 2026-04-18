import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { Button } from '@/src/components/ui';
import { colors, spacing, typography } from '@/src/theme';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function DetailModal() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string; title?: string }>();

  const handleClose = (): void => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeIn.delay(200)} style={styles.header}>
        <Text style={styles.title}>{params.title || 'Details'}</Text>
        <Text style={styles.subtitle}>ID: {params.id || 'N/A'}</Text>
      </Animated.View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={SlideInDown.delay(400)}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            This is a detailed view of the selected item. You can see more information here about the animation or content that was selected from the main screens.
          </Text>
          <Text style={styles.description}>
            The modal presentation allows for focused viewing without navigating away from the main content.
          </Text>
        </Animated.View>

        <Animated.View entering={SlideInDown.delay(600)} style={styles.features}>
          <Text style={styles.sectionTitle}>Features</Text>
          <Text style={styles.feature}>• Smooth animations</Text>
          <Text style={styles.feature}>• Modal presentation</Text>
          <Text style={styles.feature}>• Detailed information</Text>
          <Text style={styles.feature}>• Easy navigation</Text>
        </Animated.View>
      </ScrollView>

      <Animated.View entering={FadeIn.delay(800)} style={styles.footer}>
        <Button
          title="Close"
          onPress={handleClose}
          style={styles.button}
          size="medium"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: spacing.xl
  },
  header: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.xs
  },
  subtitle: {
    ...typography.body,
    color: colors.gray
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
    marginTop: spacing.lg
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: 24
  },
  features: {
    marginBottom: spacing.xl
  },
  feature: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    marginLeft: spacing.sm
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  button: {
    width: '100%'
  }
});