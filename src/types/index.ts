export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  cuisines: string[];
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  distance: string;
  imageUrl: string;
  image: string;
  description: string;
  reviewCount: number;
  isFeatured: boolean;
  categories: string[];
  menuItems: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl?: string;
  }>;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurantId: string;
  restaurantName: string;
}

export interface Order {
  id: string;
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'preparing' | 'on_the_way' | 'delivered' | 'cancelled';
  date: string;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
  latitude?: number;
  longitude?: number;
}

export interface CalculationHistory {
  id: string;
  expression: string;
  result: string;
  timestamp: string;
}