import React, { useCallback } from 'react';
import { View, Alert } from 'react-native';
import { Button } from '@/src/components/ui/button';
import { useAppDispatch } from '@/src/store/hooks';
import { toggleBookmark, enrollItem } from '@/src/store/slices/study';
import { colors, spacing } from '@/src/theme';

type ActionButtonsProps = {
  itemId: string;
  isBookmarked: boolean;
  isEnrolled: boolean;
};

export function ActionButtons({ itemId, isBookmarked, isEnrolled }: ActionButtonsProps) {
  const dispatch = useAppDispatch();

  const handleBookmark = useCallback(() => {
    dispatch(toggleBookmark(itemId));
  }, [dispatch, itemId]);

  const handleEnroll = useCallback(() => {
    if (isEnrolled) {
      Alert.alert('Already Enrolled', 'You are already enrolled in this course');
      return;
    }
    dispatch(enrollItem(itemId));
    Alert.alert('Success', 'Successfully enrolled in the course');
  }, [dispatch, itemId, isEnrolled]);

  const handleShare = useCallback(() => {
    Alert.alert('Share', 'Share functionality would open here');
  }, []);

  return (
    <View style={{ flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl }}>
      <Button
        title={isBookmarked ? 'Bookmarked' : 'Bookmark'}
        variant={isBookmarked ? 'secondary' : 'outline'}
        onPress={handleBookmark}
        style={{ flex: 1 }}
      />
      
      <Button
        title={isEnrolled ? 'Enrolled' : 'Enroll Now'}
        onPress={handleEnroll}
        disabled={isEnrolled}
        style={{ flex: 2 }}
      />
      
      <Button
        title="Share"
        variant="outline"
        onPress={handleShare}
        style={{ flex: 1 }}
      />
    </View>
  );
}
