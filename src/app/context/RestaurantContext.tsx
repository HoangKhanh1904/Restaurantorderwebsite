import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Order, Table, User, MenuItem, OrderStatus, TableStatus } from '../types';
import { menuItems as initialMenuItems, tables as initialTables } from '../data/mockData';

interface RestaurantContextType {
  // Auth
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateCartItem: (index: number, item: CartItem) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  
  // Orders
  orders: Order[];
  createOrder: (tableNumber: number, cart: CartItem[]) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  cancelOrder: (orderId: string) => void;
  
  // Tables
  tables: Table[];
  updateTableStatus: (tableNumber: number, status: TableStatus) => void;
  
  // Menu
  menuItems: MenuItem[];
  
  // Language
  language: 'vi' | 'en';
  setLanguage: (lang: 'vi' | 'en') => void;
  
  // Selected Table
  selectedTable: number | null;
  setSelectedTable: (tableNumber: number | null) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export function RestaurantProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [menuItems] = useState<MenuItem[]>(initialMenuItems);
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');
  const [selectedTable, setSelectedTable] = useState<number | null>(null);

  const login = (user: User) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
    clearCart();
    setSelectedTable(null);
  };

  const addToCart = (item: CartItem) => {
    const existingIndex = cart.findIndex(
      (c) => c.menuItem.id === item.menuItem.id && c.note === item.note
    );
    
    if (existingIndex >= 0) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += item.quantity;
      setCart(newCart);
    } else {
      setCart([...cart, item]);
    }
  };

  const updateCartItem = (index: number, item: CartItem) => {
    const newCart = [...cart];
    newCart[index] = item;
    setCart(newCart);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  const createOrder = (tableNumber: number, cartItems: CartItem[]) => {
    const orderItems = cartItems.map((item) => ({
      menuItem: item.menuItem,
      quantity: item.quantity,
      unitPrice: item.menuItem.price,
      note: item.note,
      subtotal: item.menuItem.price * item.quantity
    }));

    const subtotal = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
    const serviceCharge = subtotal * 0.05; // 5%
    const vat = subtotal * 0.08; // 8%
    const discount = 0;
    const total = subtotal + serviceCharge + vat - discount;

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      tableNumber,
      items: orderItems,
      status: 'new',
      createdAt: new Date(),
      subtotal,
      serviceCharge,
      vat,
      discount,
      total
    };

    setOrders([...orders, newOrder]);
    
    // Update table status
    updateTableStatus(tableNumber, 'occupied');
    
    clearCart();
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(orders.map((order) => 
      order.id === orderId ? { ...order, status } : order
    ));
    
    // If order is completed, update table status to empty
    if (status === 'completed') {
      const order = orders.find((o) => o.id === orderId);
      if (order) {
        updateTableStatus(order.tableNumber, 'empty');
      }
    }
  };

  const cancelOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'cancelled');
  };

  const updateTableStatus = (tableNumber: number, status: TableStatus) => {
    setTables(tables.map((table) =>
      table.number === tableNumber ? { ...table, status } : table
    ));
  };

  return (
    <RestaurantContext.Provider
      value={{
        currentUser,
        login,
        logout,
        cart,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        orders,
        createOrder,
        updateOrderStatus,
        cancelOrder,
        tables,
        updateTableStatus,
        menuItems,
        language,
        setLanguage,
        selectedTable,
        setSelectedTable
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  const context = useContext(RestaurantContext);
  if (context === undefined) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
}
