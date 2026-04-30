create or replace function set_updated_at()
returns trigger
language plpgsql
set search_path = public
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
    'case_studies',
    'media_uploads'
  ]
  loop
    execute format('drop policy if exists "Authenticated admin manage all" on %I', table_name);
    execute format(
      'create policy "Authenticated admin manage all" on %I for all to authenticated using (auth.uid() is not null) with check (auth.uid() is not null)',
      table_name
    );
  end loop;
end $$;

drop policy if exists "Public can read site settings" on site_settings;
create policy "Public can read site settings" on site_settings for select to anon using (true);

drop policy if exists "Public can read published services" on services;
create policy "Public can read published services" on services for select to anon using (published = true);

drop policy if exists "Public can read published team" on team_members;
create policy "Public can read published team" on team_members for select to anon using (published = true);

drop policy if exists "Public can read published case studies" on case_studies;
create policy "Public can read published case studies" on case_studies for select to anon using (status = 'Published');

drop policy if exists "Public can create website leads" on leads;
create policy "Public can create website leads" on leads for insert to anon with check (source = 'Website' and status = 'New');

create index if not exists projects_client_id_idx on projects (client_id);
create index if not exists projects_assigned_employee_id_idx on projects (assigned_employee_id);
create index if not exists leads_assigned_employee_id_idx on leads (assigned_employee_id);
create index if not exists leads_converted_client_id_idx on leads (converted_client_id);
create index if not exists tasks_client_id_idx on tasks (client_id);
create index if not exists tasks_project_id_idx on tasks (project_id);
create index if not exists tasks_assigned_employee_id_idx on tasks (assigned_employee_id);
create index if not exists payments_client_id_idx on payments (client_id);
create index if not exists payments_project_id_idx on payments (project_id);
create index if not exists expenses_project_id_idx on expenses (project_id);
create index if not exists expenses_employee_id_idx on expenses (employee_id);
create index if not exists media_uploads_uploaded_by_idx on media_uploads (uploaded_by);
