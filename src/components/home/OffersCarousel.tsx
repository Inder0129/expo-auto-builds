import React, { useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

type Offer = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  code?: string;
};

type OffersCarouselProps = {
  onOfferPress: (offerId: string) => void;
};

export default function OffersCarousel({ onOfferPress }: OffersCarouselProps) {
  const offers: Offer[] = [
    {
      id: '1',
      title: '50% OFF',
      description: 'On first order above ₹199',
      imageUrl: '',
      code: 'FIRST50',
    },
    {
      id: '2',
      title: 'Free Delivery',
      description: 'On orders above ₹299',
      imageUrl: '',
    },
  ];

  const renderOffer = useCallback(({ item }: { item: Offer }) => (
    <TouchableOpacity
      style={styles.offerCard}
      onPress={() => onOfferPress(item.id)}
    >
      <View style={styles.offerContent}>
        <Text style={styles.offerTitle}>{item.title}</Text>
        <Text style={styles.offerDescription}>{item.description}</Text>
        {item.code && (
          <Text style={styles.offerCode}>Use code: {item.code}</Text>
        )}
      </View>
    </TouchableOpacity>
  ), [onOfferPress]);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Offers for you</Text>
      <FlatList
        data={offers}
        renderItem={renderOffer}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContent}
      />
    </View>
  );
}

const styles = {
  container: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  carouselContent: {
    paddingRight: spacing.md,
  },
  offerCard: {
    width: 280,
    backgroundColor: colors.primary,
    borderRadius: 12,
    marginRight: spacing.md,
    padding: spacing.md,
  },
  offerContent: {
    flex: 1,
  },
  offerTitle: {
    ...typography.h3,
    color: colors.white,
    fontWeight: '700' as const,
    marginBottom: spacing.xs,
  },
  offerDescription: {
    ...typography.body,
    color: colors.white,
    opacity: 0.9,
    marginBottom: spacing.xs,
  },
  offerCode: {
    ...typography.caption,
    color: colors.white,
    opacity: 0.8,
  },
};
