-- Creovate initial database schema
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text not null,
  bio text default '',
  avatar_url text,
  cover_url text,
  country text,
  category text,
  role text not null default 'creator' check (role in ('creator','admin')),
  is_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.social_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  platform text not null,
  username text not null,
  profile_url text not null,
  follower_count bigint,
  follower_count_updated_at timestamptz,
  created_at timestamptz not null default now(),
  unique(user_id, platform)
);

create table if not exists public.categories (
  id bigint generated always as identity primary key,
  slug text unique not null,
  name_en text not null,
  name_ar text not null
);

create table if not exists public.follows (
  follower_id uuid not null references public.profiles(id) on delete cascade,
  creator_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, creator_id),
  check (follower_id <> creator_id)
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 3000),
  media_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.likes (
  user_id uuid not null references public.profiles(id) on delete cascade,
  post_id uuid not null references public.posts(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(user_id, post_id)
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 1500),
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete set null,
  kind text not null check (kind in ('follow','like','comment','verification')),
  entity_id uuid,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  target_user_id uuid references public.profiles(id) on delete cascade,
  post_id uuid references public.posts(id) on delete cascade,
  reason text not null,
  status text not null default 'open' check (status in ('open','reviewing','resolved','dismissed')),
  created_at timestamptz not null default now(),
  check (target_user_id is not null or post_id is not null)
);

create table if not exists public.verification_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  explanation text not null,
  evidence_url text,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);

create index if not exists social_accounts_user_idx on public.social_accounts(user_id);
create index if not exists posts_created_idx on public.posts(created_at desc);
create index if not exists posts_user_idx on public.posts(user_id);
create index if not exists comments_post_idx on public.comments(post_id);
create index if not exists notifications_recipient_idx on public.notifications(recipient_id, created_at desc);

-- Create a profile automatically when a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = ''
as $$
declare
  chosen_username text;
begin
  chosen_username := coalesce(
    nullif(new.raw_user_meta_data ->> 'username',''),
    'creator_' || substr(new.id::text,1,8)
  );
  insert into public.profiles(id, username, display_name)
  values(new.id, chosen_username, coalesce(nullif(new.raw_user_meta_data ->> 'display_name',''), chosen_username));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;
alter table public.social_accounts enable row level security;
alter table public.categories enable row level security;
alter table public.follows enable row level security;
alter table public.posts enable row level security;
alter table public.likes enable row level security;
alter table public.comments enable row level security;
alter table public.notifications enable row level security;
alter table public.reports enable row level security;
alter table public.verification_requests enable row level security;

-- Public creator directory; only owner can edit their own profile.
create policy "Profiles are publicly readable" on public.profiles for select using (true);
create policy "Users insert own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "Social accounts publicly readable" on public.social_accounts for select using (true);
create policy "Owners manage social accounts" on public.social_accounts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Categories publicly readable" on public.categories for select using (true);

create policy "Follows publicly readable" on public.follows for select using (true);
create policy "Users follow as themselves" on public.follows for insert with check (auth.uid() = follower_id);
create policy "Users unfollow as themselves" on public.follows for delete using (auth.uid() = follower_id);

create policy "Posts publicly readable" on public.posts for select using (true);
create policy "Owners create posts" on public.posts for insert with check (auth.uid() = user_id);
create policy "Owners update posts" on public.posts for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Owners delete posts" on public.posts for delete using (auth.uid() = user_id);

create policy "Likes publicly readable" on public.likes for select using (true);
create policy "Users like as themselves" on public.likes for insert with check (auth.uid() = user_id);
create policy "Users remove own likes" on public.likes for delete using (auth.uid() = user_id);

create policy "Comments publicly readable" on public.comments for select using (true);
create policy "Users create own comments" on public.comments for insert with check (auth.uid() = user_id);
create policy "Users delete own comments" on public.comments for delete using (auth.uid() = user_id);

create policy "Users read own notifications" on public.notifications for select using (auth.uid() = recipient_id);
create policy "Users update own notifications" on public.notifications for update using (auth.uid() = recipient_id) with check (auth.uid() = recipient_id);

create policy "Users create reports" on public.reports for insert with check (auth.uid() = reporter_id);
create policy "Users read own reports" on public.reports for select using (auth.uid() = reporter_id);

create policy "Users create verification requests" on public.verification_requests for insert with check (auth.uid() = user_id);
create policy "Users read own verification requests" on public.verification_requests for select using (auth.uid() = user_id);

insert into public.categories(slug,name_en,name_ar) values
('gaming','Gaming','الألعاب'),
('football','Football','كرة القدم'),
('technology','Technology','التكنولوجيا'),
('education','Education','التعليم'),
('entertainment','Entertainment','الترفيه'),
('lifestyle','Lifestyle','أسلوب الحياة'),
('art','Art & Design','الفن والتصميم')
on conflict (slug) do nothing;
