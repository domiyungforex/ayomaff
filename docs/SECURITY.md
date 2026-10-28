# Security Architecture & Safeguards

## 1. Threat Modeling & Protections

1. **Input Validation**: All data crossing client-server boundaries (forms, route parameters, search queries) is rigorously parsed using Zod schemas to eliminate injection vectors.
2. **Server-Side Authentication**: Admin endpoints verify session tokens server-side before processing reads or mutations. Public visitors cannot elevate privileges or access private inquiry data.
3. **Database Isolation**: PostgreSQL Row Level Security (RLS) ensures unauthenticated public connections can only `SELECT` published records and `INSERT` to unprivileged inquiry/subscriber tables.
4. **Secrets Management**: Zero credentials or private keys in client JavaScript bundles. Production environment variables (`SUPABASE_SERVICE_ROLE_KEY`, `PAYSTACK_SECRET_KEY`) reside exclusively in server runtime scopes.
5. **Rate Limiting & Spam Prevention**: Public form routes implement anti-spam honeypot parameters and IP-based rate limiting to thwart automated abuse.
6. **Payment Security**: Paystack webhook validation utilizes HMAC SHA-512 cryptographic verification (`x-paystack-signature`) with idempotent order state transitions to prevent double fulfillment or client-side tampering.
