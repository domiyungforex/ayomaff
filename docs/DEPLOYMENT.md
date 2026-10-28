# Deployment Guide — Vercel & Production Setup

> **Application**: Ayo Maff Cinematic Artist Website Concept  
> **Target Platform**: Vercel (Next.js 15.5+ App Router)  
> **Status**: Production Ready

---

## 1. Quick Deploy via Vercel CLI (Recommended)

Because Vercel requires authenticating with your personal account, run the following command directly in your terminal from the project folder (`/Users/mac/Downloads/AYO MAFF`):

```bash
cd "/Users/mac/Downloads/AYO MAFF"
npx vercel
```

### What to expect during CLI execution:
1. **Login Prompt**: If not already logged in, Vercel will ask you to press `ENTER` to open your browser and authenticate with your GitHub, GitLab, or email account.
2. **Setup Questions**:
   - `Set up and deploy “AYO MAFF”?` &rarr; Enter **`Y`**
   - `Which scope do you want to deploy to?` &rarr; Select your Vercel account
   - `Link to existing project?` &rarr; Enter **`N`**
   - `What’s your project’s name?` &rarr; Press `ENTER` (default: `ayo-maff` or `ayo-maff-experience`)
   - `In which directory is your code located?` &rarr; Press `ENTER` (`./`)
   - `Want to modify these settings?` &rarr; Enter **`N`** (preset `nextjs` and `vercel.json` are pre-configured)
3. **Live Deployment**: Vercel will upload the project, run `next build`, and print your live preview URL (e.g. `https://ayo-maff-concept.vercel.app`).

To promote directly to production:
```bash
npx vercel --prod
```

---

## 2. Deploy via GitHub Repository Integration

If you prefer continuous deployment on every Git push:

1. **Create and push to GitHub**:
   ```bash
   cd "/Users/mac/Downloads/AYO MAFF"
   
   # Using GitHub CLI (if installed):
   gh repo create ayo-maff-experience --public --source=. --remote=origin --push
   
   # Or using traditional git remote:
   git remote add origin https://github.com/<YOUR_USERNAME>/ayo-maff-experience.git
   git branch -M main
   git push -u origin main
   ```

2. **Import into Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new).
   - Select your newly created `ayo-maff-experience` repository.
   - Vercel will automatically detect **Next.js** and apply the build settings from `vercel.json`.
   - Click **Deploy**.

---

## 3. Production Environment Variables (Optional)

Configure these in your Vercel Project Settings (`Settings` &rarr; `Environment Variables`):

| Variable | Description | Default / Fallback |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Live production URL | `https://ayomaff.vercel.app` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (optional) | Uses in-memory mock repository |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public anon key | Uses in-memory mock repository |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase backend admin key | Uses in-memory mock repository |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Paystack live/test public key | Simulated test checkout active |
| `PAYSTACK_SECRET_KEY` | Paystack secret key | Simulated test verification active |
| `ADMIN_USERNAME` | Admin CMS login username | Default admin credential |
| `ADMIN_PASSWORD_HASH` | Admin CMS secure password hash | Default admin credential |

---

## 4. Supabase PostgreSQL Schema (When Connecting Live DB)

If connecting a live Supabase PostgreSQL instance, run the migration script:
- File: [`supabase/migrations/20261028000001_initial_schema.sql`](file:///Users/mac/Downloads/AYO%20MAFF/supabase/migrations/20261028000001_initial_schema.sql)
- In your Supabase Dashboard &rarr; **SQL Editor** &rarr; Paste and run the migration.
