# Supabase setup (run once on the existing project)

Project: `boorervstizsweornnpk`

## 1. Apply schema

Open the SQL Editor in the Supabase dashboard and run the SQL below. It is
idempotent and only adds tables + RLS policies — it will not destroy data.

```sql
create extension if not exists "pgcrypto";

create table if not exists public.demo_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null check (char_length(full_name) between 2 and 80),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone text check (phone is null or char_length(phone) between 6 and 20),
  course text,
  message text check (message is null or char_length(message) <= 2000),
  source text default 'website'
);

create table if not exists public.newsletter (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null unique check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null check (char_length(full_name) between 2 and 80),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  subject text check (subject is null or char_length(subject) <= 140),
  message text not null check (char_length(message) between 5 and 4000)
);

create table if not exists public.bot_sessions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  intent text,
  payload jsonb not null default '{}'::jsonb
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null check (char_length(full_name) between 2 and 80),
  rating int not null check (rating between 1 and 5),
  body text not null check (char_length(body) between 8 and 2000),
  approved boolean not null default false
);

alter table public.demo_requests    enable row level security;
alter table public.newsletter       enable row level security;
alter table public.contact_messages enable row level security;
alter table public.bot_sessions     enable row level security;
alter table public.reviews          enable row level security;

do $$ begin
  create policy "anon insert demo_requests"    on public.demo_requests    for insert to anon with check (true);
  create policy "anon insert newsletter"       on public.newsletter       for insert to anon with check (true);
  create policy "anon insert contact"          on public.contact_messages for insert to anon with check (true);
  create policy "anon insert bot_sessions"     on public.bot_sessions     for insert to anon with check (true);
  create policy "anon insert reviews"          on public.reviews          for insert to anon with check (true);
  create policy "anon read approved reviews"   on public.reviews          for select to anon using (approved = true);
exception when duplicate_object then null; end $$;
```

## 2. Security note

The credentials you pasted in chat include a **service_role secret** and the
old project **secret key**. Treat them as compromised and rotate them in
Supabase → Project Settings → API → "Reset". The website only ever uses the
**publishable / anon** key, which is safe to ship in the bundle as long as
RLS policies stay restrictive (the SQL above keeps everything insert-only
for `anon`).

## 3. Environment variables

Add to Vercel → Settings → Environment Variables (and `.env` locally):

```
VITE_SUPABASE_URL=https://boorervstizsweornnpk.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<publishable key>
```
