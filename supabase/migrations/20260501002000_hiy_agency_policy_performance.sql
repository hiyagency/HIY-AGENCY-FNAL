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
      'create policy "Authenticated admin manage all" on %I for all to authenticated using ((select auth.uid()) is not null) with check ((select auth.uid()) is not null)',
      table_name
    );
  end loop;
end $$;

do $$
begin
  if exists (
    select 1
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and p.proname = 'rls_auto_enable'
      and p.pronargs = 0
  ) then
    revoke execute on function public.rls_auto_enable() from anon;
    revoke execute on function public.rls_auto_enable() from authenticated;
  end if;
end $$;
