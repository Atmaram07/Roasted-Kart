# Security patch review: order administration

This branch adds server-side bearer-token authorization to order listing, deletion, and status updates, and validates the Razorpay checkout signature again before an order record is stored.

## Required staging configuration

1. Generate a long random secret (at least 32 random bytes) in a password manager or secrets manager.
2. Set it as `ADMIN_API_TOKEN` in the **staging Vercel project environment variables** for the environments being tested. Never commit the value or expose it as a `VITE_*` variable.
3. Deploy this branch to a staging preview, not production.
4. Visit `/admin/orders` and sign in with the token.
5. Verify that unauthenticated requests to `GET /api/orders`, `DELETE /api/orders`, and `PATCH /api/orders/:id` return HTTP 401; requests with a wrong token must also return 401.
6. Verify that the correct token permits listing and status updates. Test deletion only against disposable staging data.
7. Test checkout with a successful payment, a failed payment, a duplicate submission, and a mismatched/invalid signature.

## Important remaining blockers before production

- The create-order endpoint now calculates the regular product prices and shipping on the server and ignores browser-supplied totals. The API also verifies the Razorpay signature and checks the provider's order/payment IDs, amount, currency, and captured status before an order is saved.
- **Build Your Own Box is still a pricing blocker:** the page advertises ₹999 for five packs, but the cart currently adds individual SKUs at their regular prices. The checkout shipping rule also differs from the Build Your Own Box page. Decide and implement the intended bundle eligibility and shipping policy before production.
- The current public repository history contains a committed `orders.db`. Removing it from the current tree does not remove it from Git history or revoke copies. If it contains real customer data, investigate exposure and clean the history carefully; consider rotating any credentials if any were stored in it.
- Confirm the deployed API uses the Postgres-backed Vercel routes and does not rely on the legacy SQLite `server.js`.
- Confirm Razorpay automatic capture is enabled for the account, since the server intentionally only accepts captured payments.
- A GitHub Actions workflow was added to run `npm ci`, `npm test`, and `npm run build` on pushes and pull requests. Check the PR's Checks tab; no workflow run was visible at the time this note was updated. If Actions are disabled for the repository, run these commands locally.
- Complete the staging checks above before merge.

Do not merge or deploy until CI passes and the required staging payment/admin checks pass.
