// Types for Restaurant Order System

export type MenuCategory = 
  | 'appetizer' 
  | 'main-course' 
  | 'dessert' 
  | 'beverage' 
  | 'vietnamese' 
  | 'western' 
  | 'vegetarian';

export type OrderStatus = 
  | 'new' 
  | 'preparing' 
  | 'served' 
  | 'completed' 
  | 'cancelled';

export type TableStatus = 'empty' | 'occupied' | 'reserved';

export type PaymentMethod = 'cash' | 'card' | 'transfer' | 'e-wallet';

export type UserRole = 'server' | 'kitchen' | 'manager' | 'cashier';

export interface MenuItem {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  image: string;
  categories: MenuCategory[];
  available: boolean;
  rating: number;
  reviewCount: number;
  prepTime: number; // minutes
  ingredients?: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  note: string;
}

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
  unitPrice: number;
  note: string;
  subtotal: number;
}

export interface Order {
  id: string;
  tableNumber: number;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: Date;
  subtotal: number;
  serviceCharge: number;
  vat: number;
  discount: number;
  total: number;
  notes?: string;
}

export interface Table {
  id: number;
  number: number;
  capacity: number;
  status: TableStatus;
  currentOrder?: Order;
  reservedFor?: Date;
}

export interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
}

export interface Review {
  id: string;
  menuItemId: string;
  orderId: string;
  foodRating: number;
  serviceRating: number;
  comment: string;
  createdAt: Date;
}

export interface Payment {
  id: string;
  orderId: string;
  method: PaymentMethod;
  amount: number;
  createdAt: Date;
  email?: string;
}
