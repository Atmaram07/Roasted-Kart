import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (variant, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === variant.id);
      if (existing) {
        return prev.map((item) =>
          item.id === variant.id ? { ...item, qty: item.qty + qty } : item,
        );
      }
      return [...prev, { ...variant, qty }];
    });
  };

  const updateQty = (id, qty) => {
    setItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: Math.max(1, qty) } : item))
        .filter((item) => item.qty > 0),
    );
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setItems([]);

  const totals = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    return { count, subtotal };
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      ...totals,
    }),
    [items, totals],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
