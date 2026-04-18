import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { colors } from '@/src/theme';
import { OfferCard } from '@/src/components/offers/offer-card';
import { PromoCodeInput } from '@/src/components/offers/promo-code-input';
import { ApplyButton } from '@/src/components/offers/apply-button';
import { OfferTerms } from '@/src/components/offers/offer-terms';
import { offersStyles } from '@/src/styles/offers';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  code: string;
  validUntil: string;
  terms: string[];
}

export default function OffersScreen() {
  const [promoCode, setPromoCode] = useState<string>('');
  const [appliedOffers, setAppliedOffers] = useState<string[]>([]);

  const offers: Offer[] = [
    {
      id: '1',
      title: 'First Order Discount',
      description: 'Get 50% off on your first order',
      discount: '50% OFF',
      code: 'FIRST50',
      validUntil: '2024-12-31',
      terms: ['Valid only for first-time users', 'Minimum order ₹199', 'Max discount ₹200'],
    },
    {
      id: '2',
      title: 'Weekend Special',
      description: '30% off on all orders this weekend',
      discount: '30% OFF',
      code: 'WEEKEND30',
      validUntil: '2024-11-30',
      terms: ['Valid only on weekends', 'Minimum order ₹299', 'Max discount ₹150'],
    },
    {
      id: '3',
      title: 'Free Delivery',
      description: 'Free delivery on orders above ₹399',
      discount: 'FREE DELIVERY',
      code: 'FREEDEL',
      validUntil: '2024-12-15',
      terms: ['Valid on all restaurants', 'Minimum order ₹399', 'No cashback'],
    },
  ];

  const handleApplyPromo = useCallback(() => {
    if (promoCode.trim() && !appliedOffers.includes(promoCode)) {
      setAppliedOffers(prev => [...prev, promoCode]);
      setPromoCode('');
    }
  }, [promoCode, appliedOffers]);

  const handleRemoveOffer = useCallback((code: string) => {
    setAppliedOffers(prev => prev.filter(c => c !== code));
  }, []);

  const renderOffer = useCallback(({ item }: { item: Offer }) => (
    <OfferCard
      offer={item}
      isApplied={appliedOffers.includes(item.code)}
      onApply={() => setAppliedOffers(prev => [...prev, item.code])}
      onRemove={() => handleRemoveOffer(item.code)}
    />
  ), [appliedOffers, handleRemoveOffer]);

  return (
    <ScrollView style={offersStyles.container}>
      <Stack.Screen options={{ headerTitle: 'Offers & Promo Codes' }} />
      <View style={offersStyles.promoSection}>
        <Text style={offersStyles.sectionTitle}>Apply Promo Code</Text>
        <PromoCodeInput
          value={promoCode}
          onChangeText={setPromoCode}
          placeholder="Enter promo code"
        />
        <ApplyButton
          onPress={handleApplyPromo}
          disabled={!promoCode.trim()}
        />
      </View>
      <View style={offersStyles.appliedSection}>
        <Text style={offersStyles.sectionTitle}>Applied Offers</Text>
        {appliedOffers.length > 0 ? (
          appliedOffers.map((code: string) => (
            <View key={code} style={offersStyles.appliedCode}>
              <Text style={offersStyles.appliedCodeText}>{code}</Text>
              <ApplyButton
                title="Remove"
                onPress={() => handleRemoveOffer(code)}
                variant="outline"
              />
            </View>
          ))
        ) : (
          <Text style={offersStyles.noOffersText}>No offers applied</Text>
        )}
      </View>
      <View style={offersStyles.offersSection}>
        <Text style={offersStyles.sectionTitle}>Available Offers</Text>
        <FlatList
          data={offers}
          renderItem={renderOffer}
          keyExtractor={(item: Offer) => item.id}
          scrollEnabled={false}
        />
      </View>
      <OfferTerms />
    </ScrollView>
  );
}
