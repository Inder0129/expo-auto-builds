import React, { useCallback, useMemo } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Link } from 'expo-router';
import { HeroBanner } from '@/src/components/home/hero-banner';
import { QuickActions } from '@/src/components/home/quick-actions';
import { UpcomingClasses } from '@/src/components/home/upcoming-classes';
import { ProgressCard } from '@/src/components/home/progress-card';
import { WrapperView } from '@/src/components/ui';
import { useAppSelector } from '@/src/store/hooks';
import { selectStudyProgress } from '@/src/store/slices/study';
import { selectUser } from '@/src/store/slices/auth';
import styles from '@/src/styles/home';

export default function HomeScreen() {
  const user = useAppSelector(selectUser);
  const studyProgress = useAppSelector(selectStudyProgress);
  
  const upcomingClasses = useMemo(() => [
    { id: '1', title: 'Physics: Quantum Mechanics', time: '10:00 AM', instructor: 'Dr. Sharma' },
    { id: '2', title: 'Chemistry: Organic Compounds', time: '2:00 PM', instructor: 'Prof. Gupta' },
    { id: '3', title: 'Mathematics: Calculus', time: '4:30 PM', instructor: 'Dr. Singh' }
  ], []);
  
  const quickActions = useMemo(() => [
    { id: '1', title: 'Daily Test', icon: 'edit', route: '/test' },
    { id: '2', title: 'Study Material', icon: 'book', route: '/materials' },
    { id: '3', title: 'Doubt Forum', icon: 'message-circle', route: '/forum' },
    { id: '4', title: 'Performance', icon: 'bar-chart', route: '/performance' }
  ], []);
  
  const handleClassPress = useCallback((classId: string) => {
    console.log('Navigate to class:', classId);
  }, []);
  
  const handleActionPress = useCallback((route: string) => {
    console.log('Navigate to:', route);
  }, []);
  
  return (
    <WrapperView>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <HeroBanner userName={user?.name || 'Student'} />
        <ProgressCard progress={studyProgress} />
        <QuickActions actions={quickActions} onPress={handleActionPress} />
        <UpcomingClasses classes={upcomingClasses} onPress={handleClassPress} />
      </ScrollView>
    </WrapperView>
  );
}
