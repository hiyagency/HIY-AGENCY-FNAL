create table if not exists shipped_projects (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  display_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists shipped_projects_order_published_idx on shipped_projects (published, display_order);

alter table shipped_projects enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'shipped_projects'
      and policyname = 'Public can read shipped projects'
  ) then
    create policy "Public can read shipped projects" on shipped_projects
      for select to anon, authenticated using (published = true);
  end if;
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'shipped_projects'
      and policyname = 'Authenticated admin manage shipped projects'
  ) then
    create policy "Authenticated admin manage shipped projects" on shipped_projects
      for all to authenticated using (true) with check (true);
  end if;
end $$;

insert into shipped_projects (client_name, display_order, published)
values
  ('Financial Investment Group', 1, true),
  ('Sonam Creation', 2, true),
  ('Desi Jayka', 3, true),
  ('Kidzee', 4, true),
  ('Kinetic Green', 5, true)
on conflict do nothing;
