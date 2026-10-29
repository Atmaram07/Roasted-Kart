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

- The create-order endpoint still accepts an amount supplied by the browser. A follow-up must calculate prices and promotions on the server from a trusted catalogue, including the Build Your Own Box offer, and verify the actual Razorpay payment's order ID, captured status, amount, and currency before storing an order.
- The current public repository history contains a committed `orders.db`. Removing it from the current tree does not remove it from Git history or revoke copies. If it contains real customer data, investigate exposure and clean the history carefully; consider rotating any credentials if any were stored in it.
- Confirm the deployed API uses the Postgres-backed Vercel routes and does not rely on the legacy SQLite `server.js`.
- Run `npm ci`, `npm run build`, and the staging checks above. These checks have **not** been run by this patch authoring workflow.

Do not merge or deploy until the remaining payment-validation blocker is resolved and staging checks pass.
