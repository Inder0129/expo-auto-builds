import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OfferList from '@/src/components/offers/offer-list';
import PromoCodeInput from '@/src/components/offers/promo-code-input';
import ApplyButton from '@/src/components/offers/apply-button';
import { colors } from '@/src/theme';
import styles from '@/src/styles/offers';

interface Offer {
  id: string;
  title: string;
  description: string;
  code: string;
  discount: string;
  validUntil: string;
  isApplied: boolean;
}

const OffersScreen: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([
    { id: '1', title: 'First Order', description: 'Get 50% off on your first order', code: 'FIRST50', discount: '50%', validUntil: '2024-12-31', isApplied: false },
    { id: '2', title: 'Weekend Special', description: '30% off on weekends', code: 'WEEKEND30', discount: '30%', validUntil: '2024-11-30', isApplied: true },
    { id: '3', title: 'Free Delivery', description: 'Free delivery on orders above ₹299', code: 'FREEDEL', discount: 'Free Delivery', validUntil: '2024-10-31', isApplied: false },
  ]);
  
  const [promoCode, setPromoCode] = useState<string>('');
  
  const handleApplyOffer = useCallback((offerId: string) => {
    setOffers(prevOffers => 
      prevOffers.map(offer => 
        offer.id === offerId ? { ...offer, isApplied: !offer.isApplied } : offer
      )
    );
  }, []);
  
  const handleApplyPromoCode = useCallback(() => {
    if (promoCode.trim()) {
      // Apply promo code logic
      setPromoCode('');
    }
  }, [promoCode]);
  
  const handleCopyCode = useCallback((code: string) => {
    // Copy to clipboard logic
  }, []);
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Offers & Promo Codes</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.promoSection}>
          <PromoCodeInput
            value={promoCode}
            onChangeText={setPromoCode}
            placeholder="Enter promo code"
          />
          <ApplyButton
            onPress={handleApplyPromoCode}
            disabled={!promoCode.trim()}
          />
        </View>
        
        <OfferList
          offers={offers}
          onApplyPress={handleApplyOffer}
          onCopyPress={handleCopyCode}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default OffersScreen;