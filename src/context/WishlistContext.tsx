import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'zenith_wishlist_v1';

type WishlistContextType = {
  ids: Set<string>;
  add: (productId: string) => void;
  remove: (productId: string) => void;
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
  clear: () => void;
  count: number;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [idsArr, setIdsArr] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(idsArr));
  }, [idsArr]);

  const add = (productId: string) =>
    setIdsArr(prev => (prev.includes(productId) ? prev : [...prev, productId]));
  const remove = (productId: string) => setIdsArr(prev => prev.filter(id => id !== productId));
  const toggle = (productId: string) =>
    setIdsArr(prev => (prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]));
  const has = (productId: string) => idsArr.includes(productId);
  const clear = () => setIdsArr([]);

  const ids = useMemo(() => new Set(idsArr), [idsArr]);
  const count = idsArr.length;

  return (
    <WishlistContext.Provider value={{ ids, add, remove, toggle, has, clear, count }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
