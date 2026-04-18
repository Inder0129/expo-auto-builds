export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface UserProfile extends User {
  avatar?: string;
  defaultAddress?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  image: string;
  categories: string[];
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  restaurantId: string;
  category: string;
}

export interface CartItem extends Dish {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  items: CartItem[];
  total: number;
  deliveryAddress: string;
  status: 'pending' | 'preparing' | 'delivering' | 'delivered' | 'cancelled';
  createdAt: string;
  estimatedDelivery: string;
}

export interface Address {
  id: string;
  userId: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}