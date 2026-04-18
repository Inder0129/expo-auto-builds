export const API_BASE_URL = 'https://api.fooddelivery.com/v1';
export const APP_NAME = 'FoodDelivery';
export const APP_VERSION = '1.0.0';
export const DELIVERY_FEE = 2.99;
export const TAX_RATE = 0.08;
export const MIN_ORDER_AMOUNT = 10.0;
export const MAX_DELIVERY_DISTANCE = 10; // miles
export const CURRENCY = 'USD';
export const SUPPORT_EMAIL = 'support@fooddelivery.com';
export const SUPPORT_PHONE = '+1-800-FOOD-DEL';
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  ON_THE_WAY: 'on_the_way',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;
export const PAYMENT_METHODS = {
  CASH: 'cash',
  CARD: 'card',
  PAYPAL: 'paypal',
  APPLE_PAY: 'apple_pay',
  GOOGLE_PAY: 'google_pay',
} as const;