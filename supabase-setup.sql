-- ============================================================
-- HSMZF Database Setup
-- Paste this entire file into Supabase SQL Editor and click Run
-- ============================================================

-- 1. Donations table
create table if not exists donations (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  name text not null,
  email text not null,
  amount numeric not null,
  type text not null,
  gift_aid boolean default false,
  dedication text,
  payment_method text default 'card',
  status text default 'pending'
);

-- 2. Contact form submissions
create table if not exists contact_messages (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  first_name text,
  last_name text,
  email text not null,
  subject text,
  message text not null
);

-- 3. Fundraising progress bar
create table if not exists fundraising (
  id int primary key default 1,
  total_raised numeric default 0,
  target numeric default 500000,
  updated_at timestamp with time zone default now()
);

-- Seed starting row
insert into fundraising (id, total_raised, target)
values (1, 0, 500000)
on conflict (id) do nothing;

-- 4. Enable Row Level Security on all tables
alter table donations enable row level security;
alter table contact_messages enable row level security;
alter table fundraising enable row level security;

-- 5. Policies — who can do what

-- Anyone can submit a donation
create policy "Public can insert donations"
  on donations for insert to anon
  with check (true);

-- Anyone can read donations (for progress bar total)
create policy "Public can read donations"
  on donations for select to anon
  using (true);

-- Anyone can submit a contact message
create policy "Public can insert contact messages"
  on contact_messages for insert to anon
  with check (true);

-- Anyone can read the fundraising progress
create policy "Public can read fundraising"
  on fundraising for select to anon
  using (true);
