alter table public.posts add column parent_id uuid references public.posts(id) on delete cascade;
create index posts_parent_id_idx on public.posts(parent_id);
