create extension if not exists "pgcrypto";

create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique,
  full_name text,
  avatar_url text,
  bio text,
  onboarding_completed boolean default false,
  updated_at timestamp with time zone,
  constraint username_length check (char_length(username) >= 3)
);

create table public.topics (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  name text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.posts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  topic_id uuid references public.topics(id) on delete set null,
  content text not null,
  image_url text,
  is_anonymous boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.comments (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references public.posts(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  is_anonymous boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.likes (
  user_id uuid references public.profiles(id) on delete cascade not null,
  post_id uuid references public.posts(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (user_id, post_id)
);

alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);
create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

alter table public.topics enable row level security;
create policy "Topics are viewable by everyone." on public.topics
  for select using (true);

alter table public.posts enable row level security;
create policy "Posts are viewable by everyone." on public.posts
  for select using (true);
create policy "Authenticated users can create posts." on public.posts
  for insert with check (auth.uid() = user_id);
create policy "Users can update own posts." on public.posts
  for update using (auth.uid() = user_id);

alter table public.comments enable row level security;
create policy "Comments are viewable by everyone." on public.comments
  for select using (true);
create policy "Authenticated users can create comments." on public.comments
  for insert with check (auth.uid() = user_id);
create policy "Users can update own comments." on public.comments
  for update using (auth.uid() = user_id);

alter table public.likes enable row level security;
create policy "Likes are viewable by everyone." on public.likes
  for select using (true);
create policy "Authenticated users can create likes." on public.likes
  for insert with check (auth.uid() = user_id);
create policy "Users can delete own likes." on public.likes
  for delete using (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, username)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'username');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
