import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

type Offer = {
  id: string;
  title: string;
  description: string;
  code: string;
};

interface OfferCarouselProps {
  offers: Offer[];
  onOfferPress: (offerId: string) => void;
  style?: ViewStyle;
}

export const OfferCarousel: React.FC<OfferCarouselProps> = ({ offers, onOfferPress, style }) => {
  const renderItem = ({ item }: { item: Offer }) => (
    <TouchableOpacity
      style={offerItemStyle}
      onPress={() => onOfferPress(item.id)}
    >
      <View style={offerContentStyle}>
        <Text style={offerTitleStyle}>{item.title}</Text>
        <Text style={offerDescriptionStyle}>{item.description}</Text>
        <View style={codeContainerStyle}>
          <Text style={codeTextStyle}>Use code: {item.code}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={offers}
      renderItem={renderItem}
      keyExtractor={(item: Offer) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={style}
    />
  );
};

const offerItemStyle: ViewStyle = {
  width: 300,
  marginRight: spacing.md,
  backgroundColor: colors.primary,
  borderRadius: 12,
  padding: spacing.lg,
};

const offerContentStyle: ViewStyle = {
  flex: 1,
};

const offerTitleStyle: TextStyle = {
  ...typography.h3,
  color: colors.background,
  marginBottom: spacing.sm,
};

const offerDescriptionStyle: TextStyle = {
  ...typography.body,
  color: colors.background,
  marginBottom: spacing.md,
};

const codeContainerStyle: ViewStyle = {
  backgroundColor: colors.background,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
  borderRadius: 6,
  alignSelf: 'flex-start',
};

const codeTextStyle: TextStyle = {
  ...typography.bodySmall,
  color: colors.primary,
  fontWeight: '600',
};
