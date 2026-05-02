create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'lead_status') then
    create type lead_status as enum ('New', 'Contacted', 'Qualified', 'Proposal Sent', 'Converted', 'Lost');
  end if;
  if not exists (select 1 from pg_type where typname = 'client_project_status') then
    create type client_project_status as enum ('Not Started', 'In Progress', 'Review', 'Delivered', 'On Hold', 'Cancelled');
  end if;
  if not exists (select 1 from pg_type where typname = 'work_status') then
    create type work_status as enum ('Pending', 'In Progress', 'In Review', 'Delivered', 'Delayed');
  end if;
  if not exists (select 1 from pg_type where typname = 'task_status') then
    create type task_status as enum ('Todo', 'In Progress', 'Done', 'Blocked');
  end if;
  if not exists (select 1 from pg_type where typname = 'priority_level') then
    create type priority_level as enum ('Low', 'Medium', 'High', 'Urgent');
  end if;
  if not exists (select 1 from pg_type where typname = 'payment_status') then
    create type payment_status as enum ('Unpaid', 'Partial', 'Paid', 'Overdue');
  end if;
  if not exists (select 1 from pg_type where typname = 'expense_category') then
    create type expense_category as enum ('Ads', 'Software', 'Hosting', 'Domain', 'Freelancer', 'Employee payout', 'Travel', 'Client work expense', 'Other');
  end if;
  if not exists (select 1 from pg_type where typname = 'payout_type') then
    create type payout_type as enum ('Fixed', 'Per Project', 'Percentage', 'Custom');
  end if;
  if not exists (select 1 from pg_type where typname = 'employee_status') then
    create type employee_status as enum ('Active', 'Inactive');
  end if;
  if not exists (select 1 from pg_type where typname = 'case_study_status') then
    create type case_study_status as enum ('Draft', 'Published');
  end if;
end $$;

create table if not exists site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  short_title text,
  description text not null,
  bullet_points text[] not null default '{}',
  icon_name text,
  display_order integer not null default 0,
  featured boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  bio text not null,
  experience text,
  tags text[] not null default '{}',
  photo_url text,
  display_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists employees (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  phone text,
  email text,
  skills text[] not null default '{}',
  status employee_status not null default 'Active',
  payout_type payout_type not null default 'Custom',
  total_payout_due numeric(12,2) not null default 0,
  total_payout_paid numeric(12,2) not null default 0,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  business_name text,
  phone text,
  email text,
  service_type text,
  project_description text,
  project_status client_project_status not null default 'Not Started',
  timeline text,
  start_date date,
  deadline date,
  payment_amount numeric(12,2) not null default 0,
  amount_paid numeric(12,2) not null default 0,
  amount_pending numeric(12,2) generated always as (greatest(payment_amount - amount_paid, 0)) stored,
  notes text,
  deliverables text[] not null default '{}',
  file_links text[] not null default '{}',
  social_links jsonb not null default '{}'::jsonb,
  website_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete set null,
  title text not null,
  service_category text,
  description text,
  assigned_employee_id uuid references employees(id) on delete set null,
  status work_status not null default 'Pending',
  priority priority_level not null default 'Medium',
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  start_date date,
  due_date date,
  delivery_date date,
  notes text,
  links text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  work_required text not null,
  budget text not null,
  timeline_days integer,
  message text,
  source text not null default 'Website',
  status lead_status not null default 'New',
  follow_up_date date,
  notes text,
  assigned_employee_id uuid references employees(id) on delete set null,
  converted_client_id uuid references clients(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  client_id uuid references clients(id) on delete cascade,
  project_id uuid references projects(id) on delete cascade,
  assigned_employee_id uuid references employees(id) on delete set null,
  status task_status not null default 'Todo',
  priority priority_level not null default 'Medium',
  due_date date,
  reminder_date date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade,
  project_id uuid references projects(id) on delete set null,
  total_amount numeric(12,2) not null default 0,
  amount_paid numeric(12,2) not null default 0,
  amount_pending numeric(12,2) generated always as (greatest(total_amount - amount_paid, 0)) stored,
  status payment_status not null default 'Unpaid',
  due_date date,
  payment_method text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists expenses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  amount numeric(12,2) not null default 0,
  category expense_category not null default 'Other',
  client_id uuid references clients(id) on delete set null,
  project_id uuid references projects(id) on delete set null,
  employee_id uuid references employees(id) on delete set null,
  expense_date date not null default current_date,
  notes text,
  receipt_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists case_studies (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  industry text,
  location text,
  project_type text,
  problem text,
  solution text,
  services_delivered text[] not null default '{}',
  results jsonb not null default '{}'::jsonb,
  website_url text,
  cover_image_url text,
  gallery_images text[] not null default '{}',
  testimonial text,
  status case_study_status not null default 'Draft',
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists media_uploads (
  id uuid primary key default gen_random_uuid(),
  bucket text not null,
  path text not null,
  public_url text,
  purpose text,
  related_table text,
  related_id uuid,
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'site_settings',
    'services',
    'team_members',
    'employees',
    'clients',
    'projects',
    'leads',
    'tasks',
    'payments',
    'expenses',
    'case_studies'
  ]
  loop
    execute format('drop trigger if exists set_%I_updated_at on %I', table_name, table_name);
    execute format('create trigger set_%I_updated_at before update on %I for each row execute function set_updated_at()', table_name, table_name);
  end loop;
end $$;

create index if not exists services_published_order_idx on services (published, display_order);
create index if not exists team_members_published_order_idx on team_members (published, display_order);
create index if not exists case_studies_status_featured_idx on case_studies (status, featured, created_at desc);
create index if not exists leads_status_created_idx on leads (status, created_at desc);
create index if not exists leads_work_budget_idx on leads (work_required, budget);
create index if not exists clients_status_deadline_idx on clients (project_status, deadline);
create index if not exists projects_status_due_idx on projects (status, due_date);
create index if not exists tasks_status_due_idx on tasks (status, due_date);
create index if not exists payments_status_due_idx on payments (status, due_date);
create index if not exists expenses_client_project_idx on expenses (client_id, project_id);

alter table site_settings enable row level security;
alter table services enable row level security;
alter table team_members enable row level security;
alter table employees enable row level security;
alter table clients enable row level security;
alter table projects enable row level security;
alter table leads enable row level security;
alter table tasks enable row level security;
alter table payments enable row level security;
alter table expenses enable row level security;
alter table case_studies enable row level security;
alter table media_uploads enable row level security;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'site_settings',
    'services',
    'team_members',
    'employees',
    'clients',
    'projects',
    'leads',
    'tasks',
    'payments',
    'expenses',
    'case_studies',
    'media_uploads'
  ]
  loop
    if not exists (
      select 1 from pg_policies
      where schemaname = 'public'
        and tablename = table_name
        and policyname = 'Authenticated admin manage all'
    ) then
      execute format('create policy "Authenticated admin manage all" on %I for all to authenticated using (true) with check (true)', table_name);
    end if;
  end loop;
end $$;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'site_settings' and policyname = 'Public can read site settings') then
    create policy "Public can read site settings" on site_settings for select to anon, authenticated using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'services' and policyname = 'Public can read published services') then
    create policy "Public can read published services" on services for select to anon, authenticated using (published = true);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'team_members' and policyname = 'Public can read published team') then
    create policy "Public can read published team" on team_members for select to anon, authenticated using (published = true);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'case_studies' and policyname = 'Public can read published case studies') then
    create policy "Public can read published case studies" on case_studies for select to anon, authenticated using (status = 'Published');
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'leads' and policyname = 'Public can create website leads') then
    create policy "Public can create website leads" on leads for insert to anon, authenticated with check (source = 'Website' and status = 'New');
  end if;
end $$;

insert into site_settings (key, value)
values
  ('hero', '{"eyebrow":"HIGH IMPACT DIGITAL AGENCY","headline":"We build websites, ads, content, and systems that help businesses grow faster.","subheadline":"HIY Agency creates custom websites, performance marketing campaigns, premium creatives, automation systems, and brand experiences for businesses that want more traffic, better leads, and stronger online presence.","primaryCta":"Start Your Project","secondaryCta":"View Services"}'::jsonb),
  ('contact', '{"phone":"9109167827","whatsapp":"https://wa.me/919109167827","email":"hello@hiyagency.in","instagram":"https://instagram.com/hiyagency.in","facebook":"https://www.facebook.com/profile.php?id=61588912052640"}'::jsonb),
  ('seo', '{"title":"HIY AGENCY - High Impact for You","description":"Premium digital growth studio for websites, ads, content, automation, and business systems.","keywords":["websites","ads","automation","video editing","digital agency"]}'::jsonb)
on conflict (key) do nothing;

insert into services (slug, title, short_title, description, bullet_points, icon_name, display_order, featured, published)
values
  ('custom-websites', 'Custom Websites for Every Type of Business', 'Custom Websites', 'We design and build custom websites that match your business, your offer, and your customers - not recycled templates. From e-commerce stores and cafes to consultancy firms, real estate businesses, personal brands, and private web portals, we create websites that are built to look premium and convert.', array['Landing pages','Business websites','E-commerce websites','SaaS and product websites','Real estate websites','Cafe, restaurant, and local business websites','Portfolio and personal brand websites','Admin panels and dashboards','Hosting setup','Domain connection','SSL certificate','Contact forms and lead flows','Social media integrations','WhatsApp and call CTAs','Performance optimization','SEO-ready structure'], 'BriefcaseBusiness', 1, true, true),
  ('performance-marketing', 'Performance Marketing & Paid Growth', 'Performance Marketing', 'We help businesses bring the right traffic through Meta, Google, and YouTube campaigns. From ad creatives to budget optimization, we focus on campaigns that are built to generate enquiries, leads, bookings, and sales.', array['Meta ads','Google ads','YouTube campaign setup','Lead generation campaigns','Creative strategy','Static and motion ad creatives','Audience testing','Budget optimization','Retargeting campaigns','Scaling strategy','Campaign reporting','Conversion-focused copy'], 'Megaphone', 2, true, true),
  ('video-editing-content-production', 'Professional Video Editing That Holds Attention', 'Video Editing', 'We edit videos with hooks, pacing, storytelling, and brand visuals that make people stop scrolling. From podcasts to reels, shorts, ads, and brand videos, we create content that feels clean, sharp, and intentional.', array['Podcast editing','YouTube video editing','YouTube Shorts','Instagram Reels','Ad video editing','Hook writing','Storytelling structure','Captions and motion text','Premium transitions','Brand visual language','Content repurposing','Short-form content systems'], 'Clapperboard', 3, true, true),
  ('automation-ai-systems', 'Automation & AI Systems for Modern Businesses', 'Automation & AI Systems', 'We build smart systems that reduce manual work, capture leads faster, and help teams respond better. From chatbots to internal dashboards, we create automation flows that save time and improve operations.', array['Instagram chatbots','WhatsApp chatbots','Website chatbots','AI response systems','Lead qualification systems','Workflow automation','n8n workflows','Zapier integrations','Internal dashboards','CRM automation','Follow-up systems','Notification systems'], 'Bot', 4, true, true),
  ('branding-positioning', 'Branding That Makes Your Business Look Clear and Premium', 'Branding & Positioning', 'We help brands look sharp, sound confident, and position themselves properly in the market. From logo systems to brand messaging, we shape how your business is seen and remembered.', array['Logo direction','Identity systems','Brand voice','Messaging','Offer creation','Positioning strategy','Visual language','Profile optimization','Service packaging','Premium brand presentation'], 'BadgeCheck', 5, false, true),
  ('social-media-management', 'Social Media Systems That Keep Your Brand Active', 'Social Media Management', 'We help businesses stay consistent, visible, and engaging across social platforms with planned content, daily posting systems, and growth-focused engagement.', array['Content calendars','Daily posting systems','Caption writing','Engagement growth','Brand consistency','Creative planning','Reels strategy','Post design','Community interaction','Campaign-based content'], 'Share2', 6, false, true),
  ('seo-listings-local-discovery', 'Search Listings That Help Customers Find You', 'SEO Listings', 'We help businesses become easier to discover through organic and paid listings across search engines and local platforms. Perfect for local businesses that want more calls, visits, and enquiries.', array['Google Business Profile setup','Google Maps optimization','Justdial listing support','Local SEO basics','Search engine listing','Business description writing','Service keyword optimization','Review strategy','Location-based visibility','Paid listing support where required'], 'Search', 7, false, true),
  ('copywriting-conversion-messaging', 'Words That Make People Understand, Trust, and Take Action', 'Copywriting', 'Good design attracts attention, but strong copy converts it. We write website copy, ad copy, captions, offers, and campaign messaging that makes your business sound clear, premium, and convincing.', array['Website copy','Landing page copy','Ad copy','Sales messaging','Offer writing','Hook writing','Instagram captions','Campaign scripts','CTA writing','Brand tone development','Conversion-focused messaging'], 'FileText', 8, false, true),
  ('ad-creatives', 'Ad Creatives Built for Attention and Action', 'Ad Creatives', 'We create static and motion ad creatives that are designed to stop the scroll, explain the offer quickly, and push people toward enquiries.', array['Static ad creatives','Motion ad creatives','Reel-style ads','Product/service ad visuals','Hook-based layouts','CTA-focused designs','Multiple ad variations','Creative testing support','Premium brand-aligned visuals'], 'Sparkles', 9, false, true)
on conflict (slug) do update set
  title = excluded.title,
  short_title = excluded.short_title,
  description = excluded.description,
  bullet_points = excluded.bullet_points,
  icon_name = excluded.icon_name,
  display_order = excluded.display_order,
  featured = excluded.featured,
  published = excluded.published;

insert into team_members (name, role, bio, experience, tags, display_order, published)
values
  ('Abhigyan Pandey', 'Founder / Websites & Ads', 'IIT Delhi certified, ex-cyber security field, now working in the digital agency sector. Handles website strategy, paid ads, digital systems, and client growth execution.', '4+ years', array['IIT Delhi Certified','Ex-Cyber Security Field','Websites','Ads','Digital Systems'], 1, true),
  ('Ranveer Singh Tekam', 'Co-Founder / Copywriting, Video & Production', 'Certified from The Real World. Copywriter, video editor, and production-focused creative with experience across multiple production companies and client projects.', '4+ years', array['Copywriting','Video Editing','Production','Storytelling','Client Projects'], 2, true)
on conflict do nothing;

insert into storage.buckets (id, name, public)
values
  ('team-photos', 'team-photos', true),
  ('case-study-covers', 'case-study-covers', true),
  ('case-study-galleries', 'case-study-galleries', true),
  ('receipt-uploads', 'receipt-uploads', false),
  ('website-images', 'website-images', true)
on conflict (id) do nothing;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'Public read HIY website media') then
    create policy "Public read HIY website media" on storage.objects for select to anon, authenticated using (bucket_id in ('team-photos', 'case-study-covers', 'case-study-galleries', 'website-images'));
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'Authenticated admin manage HIY media') then
    create policy "Authenticated admin manage HIY media" on storage.objects for all to authenticated using (bucket_id in ('team-photos', 'case-study-covers', 'case-study-galleries', 'receipt-uploads', 'website-images')) with check (bucket_id in ('team-photos', 'case-study-covers', 'case-study-galleries', 'receipt-uploads', 'website-images'));
  end if;
end $$;
