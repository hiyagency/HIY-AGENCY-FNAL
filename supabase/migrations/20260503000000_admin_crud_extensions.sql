alter table leads add column if not exists business_name text;
alter table leads add column if not exists required_service text;

alter table projects add column if not exists budget numeric(12,2) not null default 0;
alter table projects add column if not exists amount_paid numeric(12,2) not null default 0;
alter table projects add column if not exists delivery_link text;
alter table projects add column if not exists published boolean not null default false;
alter table projects add column if not exists featured boolean not null default false;

alter table employees add column if not exists photo_url text;
alter table employees add column if not exists social_links jsonb not null default '{}'::jsonb;
alter table employees add column if not exists display_order integer not null default 0;

alter table payments add column if not exists paid_date date;

alter table expenses add column if not exists type text not null default 'expense';
alter table expenses add column if not exists payment_method text;

alter table case_studies add column if not exists title text;
alter table case_studies add column if not exists category text;
alter table case_studies add column if not exists short_summary text;
alter table case_studies add column if not exists full_description text;
alter table case_studies add column if not exists cloudinary_public_id text;
alter table case_studies add column if not exists video_url text;
alter table case_studies add column if not exists cta_text text;
alter table case_studies add column if not exists display_order integer not null default 0;

update case_studies
set title = coalesce(title, client_name),
    category = coalesce(category, industry),
    short_summary = coalesce(short_summary, problem),
    full_description = coalesce(full_description, solution)
where title is null
   or category is null
   or short_summary is null
   or full_description is null;

insert into storage.buckets (id, name, public)
values ('website-assets', 'website-assets', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public read website assets" on storage.objects;
create policy "Public read website assets"
on storage.objects for select to anon, authenticated
using (bucket_id = 'website-assets');

drop policy if exists "Authenticated admin manage website assets" on storage.objects;
create policy "Authenticated admin manage website assets"
on storage.objects for all to authenticated
using (bucket_id = 'website-assets' and (select auth.uid()) is not null)
with check (bucket_id = 'website-assets' and (select auth.uid()) is not null);

create index if not exists case_studies_status_order_idx on case_studies (status, display_order, created_at desc);
create index if not exists projects_public_idx on projects (published, featured, due_date);
create index if not exists employees_status_order_idx on employees (status, display_order);
