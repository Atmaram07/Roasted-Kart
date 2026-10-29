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
const BUILD_YOUR_OWN_BOX_PRICE = 999;
const PACKS_PER_BUILD_YOUR_OWN_BOX = 5;

function invalid(message) {
  throw Object.assign(new Error(message), { statusCode: 400 });
}

export function calculateCheckout(items, bundles = []) {
  if (!Array.isArray(items) || !Array.isArray(bundles) ||
      items.length + bundles.length < 1 || items.length + bundles.length > 30) {
    invalid("Your cart is empty or invalid. Please refresh your cart.");
  }

  const seen = new Set();
  const lines = [];
  let subtotal = 0;
  let totalQuantity = 0;
  let hasBuildYourOwnBox = false;

  for (const item of items) {
    const id = typeof item?.id === "string" ? item.id : "";
    const qty = Number(item?.qty);
    const price = VARIANT_PRICES[id];

    if (!price || seen.has(id) || !Number.isSafeInteger(qty) || qty < 1 || qty > 20) {
      invalid("One or more cart items are invalid. Please refresh your cart.");
    }

    seen.add(id);
    totalQuantity += qty;
    subtotal += price * qty;
    lines.push({ id, qty, unitPrice: price, lineTotal: price * qty, type: "product" });
  }

  for (const bundle of bundles) {
    const selected = bundle?.items;
    const bundleQty = Number(bundle?.qty ?? 1);
    if (!Array.isArray(selected) || !Number.isSafeInteger(bundleQty) || bundleQty < 1 || bundleQty > 5 ||
        selected.length < 1 || selected.length > PACKS_PER_BUILD_YOUR_OWN_BOX) {
      invalid("Each Build Your Own Box must contain exactly five eligible packs.");
    }

    let selectedPackCount = 0;
    const selectedLines = [];
    for (const selection of selected) {
      const id = typeof selection?.id === "string" ? selection.id : "";
      const qty = Number(selection?.qty);
      if (!VARIANT_PRICES[id] || !Number.isSafeInteger(qty) || qty < 1 || qty > 5) {
        invalid("The Build Your Own Box contains an ineligible product or invalid quantity.");
      }
      selectedPackCount += qty;
      selectedLines.push({ id, qty });
    }

    if (selectedPackCount !== PACKS_PER_BUILD_YOUR_OWN_BOX) {
      invalid("Each Build Your Own Box must contain exactly five eligible packs.");
    }

    hasBuildYourOwnBox = true;
    totalQuantity += selectedPackCount * bundleQty;
    const lineTotal = BUILD_YOUR_OWN_BOX_PRICE * bundleQty;
    subtotal += lineTotal;
    lines.push({
      id: "build-your-own-box",
      qty: bundleQty,
      unitPrice: BUILD_YOUR_OWN_BOX_PRICE,
      lineTotal,
      type: "bundle",
      items: selectedLines,
    });
  }

  if (totalQuantity > 100 || !Number.isSafeInteger(subtotal)) {
    invalid("Your cart exceeds the checkout limits.");
  }

  // A Build Your Own Box includes free shipping. Otherwise, preserve the standard rule.
  const shipping = hasBuildYourOwnBox || subtotal > 500 ? 0 : 49;
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
