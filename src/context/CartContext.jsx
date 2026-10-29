import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

function cartKey(item) {
  return item.cartKey || item.id;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (variant, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => !item.isBundle && item.id === variant.id);
      if (existing) {
        return prev.map((item) =>
          !item.isBundle && item.id === variant.id ? { ...item, qty: item.qty + qty } : item,
        );
      }
      return [...prev, { ...variant, qty }];
    });
  };

  const addBundleToCart = (selectedPacks) => {
    const bundleItems = selectedPacks.map((variant) => ({
      id: variant.id,
      name: variant.productName,
      weight: variant.weight,
      qty: 1,
    }));
    const cartKeyValue = `build-your-own-box-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setItems((prev) => [
      ...prev,
      {
        id: "build-your-own-box",
        cartKey: cartKeyValue,
        isBundle: true,
        bundleItems,
        name: "Build Your Own Box",
        weight: "5 selected packs",
        productCategory: "Custom Snack Box",
        qty: 1,
        price: 999,
        mrp: 999,
      },
    ]);
  };

  const updateQty = (id, qty) => {
    setItems((prev) =>
      prev
        .map((item) => (cartKey(item) === id ? { ...item, qty: item.isBundle ? 1 : Math.max(1, qty) } : item))
        .filter((item) => item.qty > 0),
    );
  };

  const removeFromCart = (id) => setItems((prev) => prev.filter((item) => cartKey(item) !== id));
  const clearCart = () => setItems([]);

  const totals = useMemo(() => {
    const count = items.reduce((sum, item) => sum + (item.isBundle ? item.bundleItems.length : item.qty), 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    return { count, subtotal };
  }, [items]);

  const value = useMemo(
    () => ({ items, addToCart, addBundleToCart, updateQty, removeFromCart, clearCart, ...totals }),
    [items, totals],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
