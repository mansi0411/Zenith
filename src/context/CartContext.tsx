import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { products, getProductById, Product } from '@/data/products';

export type CartItem = {
  id: string; // cart item id
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (productId: string, options?: { quantity?: number; size?: string; color?: string }) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  detailedItems: Array<CartItem & { product: Product }>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'zenith_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem: CartContextType['addItem'] = useCallback((productId, options = {}) => {
    const { quantity = 1, size, color } = options;
    
    console.log('Adding item to cart:', { productId, quantity, size, color }); // Debug log
    
    setItems(prev => {
      const existingItemIndex = prev.findIndex(
        (item) => item.productId === productId && item.size === size && item.color === color,
      );
      
      if (existingItemIndex > -1) {
        // Update existing item
        const newItems = [...prev];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        };
        console.log('Updated existing item, new cart:', newItems); // Debug log
        return newItems;
      } else {
        // Add new item
        const newItem = {
          id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          productId,
          quantity,
          size,
          color
        };
        const newItems = [...prev, newItem];
        console.log('Added new item, new cart:', newItems); // Debug log
        return newItems;
      }
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems(prev => prev.filter(i => i.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    setItems(prev => {
      return prev
        .map(i => (i.id === itemId ? { ...i, quantity: Math.max(1, quantity) } : i))
        .filter(i => i.quantity > 0);
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const detailedItems = useMemo(() => {
    return items
      .map(i => ({ product: getProductById(i.productId), ...i }))
      .filter((i): i is CartItem & { product: Product } => Boolean(i.product));
  }, [items]);

  const totalItems = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  const totalPrice = useMemo(
    () => detailedItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [detailedItems],
  );

  const value: CartContextType = useMemo(() => ({
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    detailedItems,
  }), [items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, detailedItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};