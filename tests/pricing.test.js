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

test("applies free shipping only when standard-cart subtotal is above ₹500", () => {
  const checkout = calculateCheckout([{ id: "peri-peri-soya-pops-200g", qty: 3 }]);
  assert.equal(checkout.subtotalRupees, 537);
  assert.equal(checkout.shippingRupees, 0);
  assert.equal(checkout.amountPaise, 53700);
});

test("prices a valid Build Your Own Box at ₹999 with free shipping", () => {
  const checkout = calculateCheckout([], [{
    qty: 1,
    items: [
      { id: "peri-peri-soya-pops-200g", qty: 1 },
      { id: "pudina-soya-pops-200g", qty: 1 },
      { id: "cream-onion-soya-pops-200g", qty: 1 },
      { id: "peri-peri-soya-pops-80g-pack", qty: 1 },
      { id: "all-in-one-trail-pack", qty: 1 },
    ],
  }]);
  assert.equal(checkout.subtotalRupees, 999);
  assert.equal(checkout.shippingRupees, 0);
  assert.equal(checkout.totalRupees, 999);
  assert.equal(checkout.amountPaise, 99900);
  assert.equal(checkout.lines[0].type, "bundle");
});

test("accepts any five eligible packs, including repeats", () => {
  const checkout = calculateCheckout([], [{
    items: [{ id: "peri-peri-soya-pops-80g-pack", qty: 5 }],
  }]);
  assert.equal(checkout.totalRupees, 999);
  assert.equal(checkout.lines[0].items[0].qty, 5);
});

test("rejects Build Your Own Box selections with fewer or more than five packs", () => {
  assert.throws(() => calculateCheckout([], [{
    items: [{ id: "peri-peri-soya-pops-80g-pack", qty: 4 }],
  }]), /exactly five/i);
  assert.throws(() => calculateCheckout([], [{
    items: [
      { id: "peri-peri-soya-pops-80g-pack", qty: 3 },
      { id: "pudina-soya-pops-80g-pack", qty: 3 },
    ],
  }]), /exactly five/i);
});

test("rejects ineligible items and invalid quantities inside a bundle", () => {
  assert.throws(() => calculateCheckout([], [{
    items: [{ id: "not-a-product", qty: 5 }],
  }]), /ineligible/i);
  assert.throws(() => calculateCheckout([], [{
    items: [{ id: "peri-peri-soya-pops-80g-pack", qty: 1.5 }],
  }]), /ineligible/i);
});

test("prices regular products alongside a bundle without charging shipping", () => {
  const checkout = calculateCheckout(
    [{ id: "peri-peri-soya-pops-200g", qty: 1 }],
    [{ items: [{ id: "peri-peri-soya-pops-80g-pack", qty: 5 }] }],
  );
  assert.equal(checkout.subtotalRupees, 1178);
  assert.equal(checkout.shippingRupees, 0);
  assert.equal(checkout.totalRupees, 1178);
});

test("rejects unknown product IDs and invalid quantities in a regular cart", () => {
  assert.throws(() => calculateCheckout([{ id: "made-up-product", qty: 1 }]), /invalid/i);
  assert.throws(() => calculateCheckout([{ id: "peri-peri-soya-pops-200g", qty: 0 }]), /invalid/i);
  assert.throws(() => calculateCheckout([{ id: "peri-peri-soya-pops-200g", qty: 1.5 }]), /invalid/i);
});

test("rejects empty carts and excessive quantities", () => {
  assert.throws(() => calculateCheckout([]), /empty or invalid/i);
  assert.throws(() => calculateCheckout([{ id: "peri-peri-soya-pops-200g", qty: 21 }]), /invalid/i);
});
