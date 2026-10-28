# Deployment Guide — Vercel & Production Setup

## 1. Vercel Deployment

1. **Connect Repository**: Link the GitHub/GitLab repository to Vercel.
2. **Framework Preset**: Vercel automatically detects Next.js.
3. **Environment Variables**: Configure the production variables in the Vercel Dashboard:
   - `NEXT_PUBLIC_SITE_URL`: Production domain (e.g., `https://ayomaff.com`)
   - `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` & `PAYSTACK_SECRET_KEY`
   - `ADMIN_USERNAME` & `ADMIN_PASSWORD_HASH`
4. **Build & Output Settings**:
   - Build Command: `next build`
   - Output Directory: `.next`
   - Install Command: `npm install`

---

## 2. Supabase Migration Execution

Run migrations against your Supabase project:
```bash
supabase db push
# Or run migrations manually in SQL Editor:
# supabase/migrations/20261028000001_initial_schema.sql
```
