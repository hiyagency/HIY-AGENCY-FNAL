# HIY AGENCY

Production Next.js App Router website and admin foundation for HIY Agency.

## Stack

- Next.js App Router, TypeScript, Tailwind CSS v4
- Framer Motion for lightweight motion
- Supabase database, auth, storage, and RLS
- shadcn/ui components where useful
- React Hook Form + Zod for lead and login forms
- Recharts for admin analytics

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` from `.env.example`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

3. Run locally:

```bash
npm run dev
```

4. Open:

```text
http://127.0.0.1:3000
```

## Routes

- `/` public homepage
- `/services` full service detail page
- `/case-studies` published case studies with premium empty state
- `/team` founding team page
- `/contact` lead form and contact CTAs
- `/admin/login` single-admin login
- `/admin` dashboard
- `/admin/website-management`
- `/admin/leads`
- `/admin/clients`
- `/admin/projects`
- `/admin/finance`
- `/admin/employees`
- `/admin/todo`
- `/admin/payments`
- `/admin/settings`

## Supabase

The migration lives at:

```text
supabase/migrations/20260501000000_hiy_agency_core.sql
```

It creates:

- `site_settings`
- `services`
- `team_members`
- `case_studies`
- `leads`
- `clients`
- `projects`
- `employees`
- `tasks`
- `payments`
- `expenses`
- `media_uploads`

It also creates RLS policies, indexes, seed services/team content, and these storage buckets:

- `team-photos`
- `case-study-covers`
- `case-study-galleries`
- `receipt-uploads`
- `website-images`

## Admin Auth

Create one Supabase Auth user for the admin account. The app protects all `/admin/*` routes through the Next proxy. Authenticated users can manage CRM and website-management tables through the RLS admin policies.

## Lead Form

The public lead form validates with Zod and saves to `leads` with:

- `status = New`
- `source = Website`

Submitted leads appear in `/admin/leads` and feed the dashboard metrics.
