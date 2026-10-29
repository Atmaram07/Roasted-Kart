const VARIANT_PRICES = Object.freeze({
  "millet-box-pack": 279,
  "protein-box-pack": 199,
  "peri-peri-soya-pops-200g": 179,
  "pudina-soya-pops-200g": 179,
  "cream-onion-soya-pops-200g": 179,
  "peri-peri-soya-pops-80g-pack": 79,
  "pudina-soya-pops-80g-pack": 79,
  "cream-onion-soya-pops-80g-pack": 79,
  "soya-pops-combo-3x200g": 499,
  "all-in-one-trail-pack": 549,
});

export function calculateCheckout(items) {
  if (!Array.isArray(items) || items.length < 1 || items.length > 30) {
    throw Object.assign(new Error("Your cart is empty or invalid. Please refresh your cart."), { statusCode: 400 });
  }

  const seen = new Set();
  const lines = [];
  let subtotal = 0;
  let totalQuantity = 0;

  for (const item of items) {
    const id = typeof item?.id === "string" ? item.id : "";
    const qty = Number(item?.qty);
    const price = VARIANT_PRICES[id];

    if (!price || seen.has(id) || !Number.isSafeInteger(qty) || qty < 1 || qty > 20) {
      throw Object.assign(new Error("One or more cart items are invalid. Please refresh your cart."), { statusCode: 400 });
    }

    seen.add(id);
    totalQuantity += qty;
    subtotal += price * qty;
    lines.push({ id, qty, unitPrice: price, lineTotal: price * qty });
  }

  if (totalQuantity > 50 || !Number.isSafeInteger(subtotal)) {
    throw Object.assign(new Error("Your cart exceeds the checkout limits."), { statusCode: 400 });
  }

  // Keep the existing storefront shipping rule: free shipping above ₹500.
  const shipping = subtotal > 500 ? 0 : 49;
  const total = subtotal + shipping;

  return {
    lines,
    subtotalRupees: subtotal,
    shippingRupees: shipping,
    totalRupees: total,
    amountPaise: total * 100,
    currency: "INR",
  };
}
