import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '@/src/theme';
import { OfferCard } from '@/src/components/offers/offer-card';
import { PromoCodeInput } from '@/src/components/offers/promo-code-input';
import { EmptyOffers } from '@/src/components/offers/empty-offers';
import { styles } from '@/src/styles/offers';

interface Offer {
  id: string;
  title: string;
  description: string;
  code?: string;
  discount: string;
  validUntil: string;
  minOrder?: number;
  applicableOn: string[];
}

export default function OffersScreen() {
  const [offers, setOffers] = useState<Offer[]>([
    {
      id: '1',
      title: 'First Order Special',
      description: 'Get 50% off on your first order',
      code: 'FIRST50',
      discount: '50% OFF',
      validUntil: '2024-12-31',
      minOrder: 199,
      applicableOn: ['All restaurants'],
    },
    {
      id: '2',
      title: 'Weekend Treat',
      description: 'Flat ₹100 off on orders above ₹499',
      code: 'WEEKEND100',
      discount: '₹100 OFF',
      validUntil: '2024-11-30',
      minOrder: 499,
      applicableOn: ['Selected restaurants'],
    },
    {
      id: '3',
      title: 'Free Delivery',
      description: 'Free delivery on all orders',
      discount: 'FREE DELIVERY',
      validUntil: '2024-10-31',
      applicableOn: ['All restaurants'],
    },
  ]);

  const [appliedCodes, setAppliedCodes] = useState<string[]>([]);

  const handleApplyCode = useCallback((code: string) => {
    if (appliedCodes.includes(code)) {
      Alert.alert('Already Applied', 'This promo code is already applied.');
      return;
    }
    setAppliedCodes(prev => [...prev, code]);
    Alert.alert('Success', 'Promo code applied successfully!');
  }, [appliedCodes]);

  const handleRemoveCode = useCallback((code: string) => {
    setAppliedCodes(prev => prev.filter(c => c !== code));
  }, []);

  const handleCopyCode = useCallback((code: string) => {
    // In a real app, you would use Clipboard API here
    Alert.alert('Copied', `Code ${code} copied to clipboard`);
  }, []);

  const renderOfferItem = useCallback(({ item }: { item: Offer }) => (
    <OfferCard
      offer={item}
      onApply={item.code ? () => handleApplyCode(item.code!) : undefined}
      onCopy={item.code ? () => handleCopyCode(item.code!) : undefined}
      isApplied={item.code ? appliedCodes.includes(item.code) : false}
    />
  ), [handleApplyCode, handleCopyCode, appliedCodes]);

  if (offers.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <EmptyOffers />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Available Offers</Text>
        <Text style={styles.subtitle}>Apply promo codes and save more</Text>
      </View>

      <PromoCodeInput
        onApply={handleApplyCode}
        appliedCodes={appliedCodes}
        onRemove={handleRemoveCode}
      />

      <FlatList
        data={offers}
        renderItem={renderOfferItem}
        keyExtractor={(item: Offer) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
