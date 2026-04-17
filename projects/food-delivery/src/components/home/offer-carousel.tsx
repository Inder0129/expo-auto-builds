import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

interface Offer {
  id: string;
  title: string;
  description: string;
  code: string;
}

interface OfferCarouselProps {
  offers: Offer[];
  onOfferPress: (offerId: string) => void;
}

export const OfferCarousel: React.FC<OfferCarouselProps> = ({ offers, onOfferPress }) => {
  const renderOffer = ({ item }: { item: Offer }) => (
    <TouchableOpacity 
      style={styles.offerCard} 
      onPress={() => onOfferPress(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.offerContent}>
        <View style={styles.offerHeader}>
          <Ionicons name="pricetag" size={20} color={colors.white} />
          <Text style={styles.offerTitle}>{item.title}</Text>
        </View>
        <Text style={styles.offerDescription}>{item.description}</Text>
        <View style={styles.codeContainer}>
          <Text style={styles.codeText}>Use code: </Text>
          <Text style={styles.codeValue}>{item.code}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={offers}
      renderItem={renderOffer}
      keyExtractor={(item: Offer) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.carouselContent}
    />
  );
};

const styles = StyleSheet.create({
  carouselContent: {
    paddingRight: spacing.lg,
  },
  offerCard: {
    width: 280,
    marginRight: spacing.md,
    backgroundColor: colors.secondary.main,
    borderRadius: spacing.md,
    padding: spacing.lg,
  },
  offerContent: {
    flex: 1,
  },
  offerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  offerTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.bold,
    color: colors.white,
    marginLeft: spacing.sm,
  },
  offerDescription: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.regular,
    color: colors.white,
    opacity: 0.9,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.white,
    opacity: 0.9,
  },
  codeValue: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.bold,
    color: colors.white,
  },
});
