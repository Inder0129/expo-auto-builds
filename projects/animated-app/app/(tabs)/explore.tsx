import { View, ScrollView, Text, FlatList } from 'react-native';
import { useCallback, useMemo } from 'react';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { SearchBar } from '@/src/components/explore/search-bar';
import { CategoryGrid } from '@/src/components/explore/category-grid';
import { AnimatedList } from '@/src/components/explore/animated-list';
import { styles } from '@/src/styles/explore';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface ListItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export default function ExploreScreen() {
  const scrollY = useSharedValue(0);
  const categories: Category[] = useMemo(() => [
    { id: '1', name: 'Animation', icon: 'play-circle' },
    { id: '2', name: 'Design', icon: 'brush' },
    { id: '3', name: 'Development', icon: 'code' },
    { id: '4', name: 'Music', icon: 'musical-notes' },
    { id: '5', name: 'Art', icon: 'color-palette' },
    { id: '6', name: 'Games', icon: 'game-controller' },
  ], []);

  const listItems: ListItem[] = useMemo(() => [
    { id: '1', title: 'Spring Animation', subtitle: 'Learn spring physics', image: 'https://picsum.photos/200/300' },
    { id: '2', title: 'Parallax Effect', subtitle: 'Create depth illusion', image: 'https://picsum.photos/200/301' },
    { id: '3', title: 'Gesture Handling', subtitle: 'Interactive animations', image: 'https://picsum.photos/200/302' },
    { id: '4', title: 'Shared Values', subtitle: 'State management', image: 'https://picsum.photos/200/303' },
    { id: '5', title: 'Layout Animations', subtitle: 'Smooth transitions', image: 'https://picsum.photos/200/304' },
  ], []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const handleSearch = useCallback((query: string) => {
    console.log('Search query:', query);
  }, []);

  const handleCategoryPress = useCallback((categoryId: string) => {
    console.log('Category pressed:', categoryId);
  }, []);

  const handleItemPress = useCallback((itemId: string) => {
    console.log('Item pressed:', itemId);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Explore</Text>
          <Text style={styles.subtitle}>Discover amazing animations</Text>
        </View>
        <SearchBar onSearch={handleSearch} />
        <CategoryGrid
          categories={categories}
          onPress={handleCategoryPress}
        />
        <View style={styles.listContainer}>
          <Text style={styles.sectionTitle}>Featured Content</Text>
          <AnimatedList
            items={listItems}
            scrollY={scrollY}
            onPress={handleItemPress}
          />
        </View>
      </Animated.ScrollView>
    </View>
  );
}