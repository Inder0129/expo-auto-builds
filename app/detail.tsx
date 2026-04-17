import React, { useMemo } from 'react';
import { View, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { DetailHeader } from '@/src/components/detail/detail-header';
import { ContentViewer } from '@/src/components/detail/content-viewer';
import { ActionButtons } from '@/src/components/detail/action-buttons';
import { WrapperView } from '@/src/components/ui/wrapper-view';
import { useAppSelector } from '@/src/store/hooks';
import { selectStudyItemById } from '@/src/store/slices/study';
import { styles } from '@/src/styles/detail';

type DetailParams = {
  id: string;
};

export default function DetailScreen() {
  const params = useLocalSearchParams<DetailParams>();
  const router = useRouter();
  
  const item = useAppSelector((state) => 
    selectStudyItemById(state, params.id || '')
  );

  const content = useMemo(() => {
    if (!item) return null;
    return {
      title: item.title,
      description: item.description,
      content: item.content,
      type: item.type,
      duration: item.duration,
      difficulty: item.difficulty,
    };
  }, [item]);

  if (!item) {
    return (
      <WrapperView>
        <View style={styles.notFoundContainer}>
          <DetailHeader title="Not Found" />
        </View>
      </WrapperView>
    );
  }

  return (
    <WrapperView>
      <ScrollView contentContainerStyle={styles.container}>
        <DetailHeader
          title={item.title}
          subtitle={item.subtitle}
          instructor={item.instructor}
          rating={item.rating}
        />
        
        <ContentViewer content={content} />
        
        <ActionButtons
          itemId={item.id}
          isBookmarked={item.isBookmarked}
          isEnrolled={item.isEnrolled}
        />
      </ScrollView>
    </WrapperView>
  );
}
