import test from "node:test";
import assert from "node:assert/strict";
import { calculateCheckout } from "../api/_pricing.js";

test("uses trusted server prices and charges shipping below the free-shipping threshold", () => {
  const checkout = calculateCheckout([{ id: "peri-peri-soya-pops-200g", qty: 1 }]);
  assert.equal(checkout.subtotalRupees, 179);
  assert.equal(checkout.shippingRupees, 49);
  assert.equal(checkout.totalRupees, 228);
  assert.equal(checkout.amountPaise, 22800);
});

test("applies free shipping only when subtotal is above ₹500", () => {
  const checkout = calculateCheckout([
    { id: "peri-peri-soya-pops-200g", qty: 3 },
  ]);
  assert.equal(checkout.subtotalRupees, 537);
  assert.equal(checkout.shippingRupees, 0);
  assert.equal(checkout.amountPaise, 53700);
});

test("rejects unknown product IDs and invalid quantities", () => {
  assert.throws(() => calculateCheckout([{ id: "made-up-product", qty: 1 }]), /invalid/i);
  assert.throws(() => calculateCheckout([{ id: "peri-peri-soya-pops-200g", qty: 0 }]), /invalid/i);
  assert.throws(() => calculateCheckout([{ id: "peri-peri-soya-pops-200g", qty: 1.5 }]), /invalid/i);
});

test("rejects empty carts and excessive quantities", () => {
  assert.throws(() => calculateCheckout([]), /empty or invalid/i);
  assert.throws(() => calculateCheckout([{ id: "peri-peri-soya-pops-200g", qty: 21 }]), /invalid/i);
});
