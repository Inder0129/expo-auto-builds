import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/src/components/ui';
import { StepIndicator } from '@/src/components/checkout/step-indicator';
import { AddressCard } from '@/src/components/checkout/address-card';
import { PaymentOption } from '@/src/components/checkout/payment-option';
import { OrderSummary } from '@/src/components/checkout/order-summary';
import { colors, spacing, typography } from '@/src/theme';
import { checkoutStyles } from '@/src/styles/checkout';

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'applepay';
  lastFour?: string;
  name: string;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function CheckoutScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  
  const addresses: Address[] = useMemo(() => [
    { id: '1', name: 'Home', street: '123 Main St', city: 'New York', state: 'NY', zipCode: '10001', phone: '(123) 456-7890', isDefault: true },
    { id: '2', name: 'Work', street: '456 Office Ave', city: 'New York', state: 'NY', zipCode: '10002', phone: '(123) 456-7891', isDefault: false },
  ], []);
  
  const paymentMethods: PaymentMethod[] = useMemo(() => [
    { id: '1', type: 'card', lastFour: '4242', name: 'Visa ending in 4242' },
    { id: '2', type: 'paypal', name: 'PayPal' },
    { id: '3', type: 'applepay', name: 'Apple Pay' },
  ], []);
  
  const orderItems: OrderItem[] = useMemo(() => [
    { id: '1', name: 'Product 1', price: 29.99, quantity: 2 },
    { id: '2', name: 'Product 2', price: 19.99, quantity: 1 },
  ], []);
  
  const subtotal = useMemo(() => {
    return orderItems.reduce((sum: number, item: OrderItem) => sum + (item.price * item.quantity), 0);
  }, [orderItems]);
  
  const shipping = 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  
  const steps = ['Address', 'Payment', 'Review'];
  
  const handleNextStep = useCallback(() => {
    if (currentStep === 1 && !selectedAddress) {
      Alert.alert('Please select an address');
      return;
    }
    if (currentStep === 2 && !selectedPayment) {
      Alert.alert('Please select a payment method');
      return;
    }
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handlePlaceOrder();
    }
  }, [currentStep, selectedAddress, selectedPayment, steps.length]);
  
  const handlePreviousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);
  
  const handlePlaceOrder = useCallback(() => {
    console.log('Placing order:', { selectedAddress, selectedPayment, orderItems, total });
    router.push('/order-success');
  }, [selectedAddress, selectedPayment, orderItems, total, router]);
  
  const handleAddressSelect = useCallback((address: Address) => {
    setSelectedAddress(address);
  }, []);
  
  const handlePaymentSelect = useCallback((payment: PaymentMethod) => {
    setSelectedPayment(payment);
  }, []);
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={checkoutStyles.stepContent}>
            <Text style={checkoutStyles.stepTitle}>Select Delivery Address</Text>
            {addresses.map((address: Address) => (
              <AddressCard 
                key={address.id}
                address={address}
                isSelected={selectedAddress?.id === address.id}
                onSelect={() => handleAddressSelect(address)}
              />
            ))}
            <TouchableOpacity style={checkoutStyles.addButton}>
              <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
              <Text style={checkoutStyles.addButtonText}>Add New Address</Text>
            </TouchableOpacity>
          </View>
        );
      case 2:
        return (
          <View style={checkoutStyles.stepContent}>
            <Text style={checkoutStyles.stepTitle}>Select Payment Method</Text>
            {paymentMethods.map((payment: PaymentMethod) => (
              <PaymentOption 
                key={payment.id}
                payment={payment}
                isSelected={selectedPayment?.id === payment.id}
                onSelect={() => handlePaymentSelect(payment)}
              />
            ))}
          </View>
        );
      case 3:
        return (
          <View style={checkoutStyles.stepContent}>
            <Text style={checkoutStyles.stepTitle}>Review Your Order</Text>
            <OrderSummary 
              items={orderItems}
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
            />
          </View>
        );
      default:
        return null;
    }
  };
  
  return (
    <View style={checkoutStyles.container}>
      <View style={checkoutStyles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={checkoutStyles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <StepIndicator 
        steps={steps}
        currentStep={currentStep}
      />
      
      <ScrollView style={checkoutStyles.content}>
        {renderStepContent()}
      </ScrollView>
      
      <View style={checkoutStyles.footer}>
        {currentStep > 1 && (
          <Button 
            title="Back"
            onPress={handlePreviousStep}
            variant="outline"
            style={checkoutStyles.backButton}
          />
        )}
        <Button 
          title={currentStep === steps.length ? 'Place Order' : 'Continue'}
          onPress={handleNextStep}
          style={checkoutStyles.nextButton}
        />
      </View>
    </View>
  );
}
