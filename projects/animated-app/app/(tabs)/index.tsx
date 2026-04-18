import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  useSharedValue,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import { useCallback, useEffect } from 'react';
import { HeroBanner } from '@/src/components/home/hero-banner';
import { AnimatedCard } from '@/src/components/home/animated-card';
import { FloatingActionButton } from '@/src/components/home/floating-action-button';
import { styles } from '@/src/styles/home';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

interface CardData {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export default function HomeScreen() {
  const cards: CardData[] = [
    { id: '1', title: 'Welcome', description: 'Get started with animations', icon: 'rocket', color: colors.primary },
    { id: '2', title: 'Explore', description: 'Discover amazing content', icon: 'compass', color: colors.secondary },
    { id: '3', title: 'Profile', description: 'Customize your experience', icon: 'person', color: colors.accent },
  ];

  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
  }));

  const handleCardPress = useCallback((cardId: string) => {
    console.log('Card pressed:', cardId);
  }, []);

  const handleFabPress = useCallback(() => {
    scale.value = withSequence(
      withSpring(0.9),
      withSpring(1)
    );
    rotation.value = withTiming(rotation.value + 45, { duration: 200 });
  }, [scale, rotation]);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 2000 }),
      -1,
      false
    );
  }, [rotation]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeroBanner />
        <View style={styles.cardsContainer}>
          <Text style={styles.sectionTitle}>Featured Cards</Text>
          {cards.map((card: CardData) => (
            <AnimatedCard
              key={card.id}
              title={card.title}
              description={card.description}
              icon={card.icon}
              color={card.color}
              onPress={() => handleCardPress(card.id)}
            />
          ))}
        </View>
        <View style={styles.linkContainer}>
          <Link href="/(modals)/detail" asChild>
            <TouchableOpacity style={styles.linkButton}>
              <Text style={styles.linkText}>View Details</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
      <Animated.View style={[styles.fabContainer, animatedStyle]}>
        <FloatingActionButton onPress={handleFabPress} />
      </Animated.View>
    </View>
  );
}