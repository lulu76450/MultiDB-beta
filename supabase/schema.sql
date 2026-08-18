-- ============================================================
-- MultiDB — Système d'avis sur les mods
-- À exécuter dans le SQL Editor de Supabase (projet MultiCraft / Deblock).
--
-- Le `mod_id` correspond au champ `id` de chaque entrée de `mods.json`.
-- ============================================================

create table if not exists public.mod_reviews (
  id         uuid primary key default gen_random_uuid(),
  mod_id     text not null,
  user_id    uuid not null references auth.users (id) on delete cascade,
  pseudo     text not null default 'Anonyme',
  rating     integer not null check (rating between 1 and 5),
  text       text,
  created_at timestamptz not null default now()
);

-- Un seul avis par utilisateur et par mod
create unique index if not exists mod_reviews_mod_user_idx
  on public.mod_reviews (mod_id, user_id);

-- Index pour lire rapidement les avis d'un mod
create index if not exists mod_reviews_mod_id_idx
  on public.mod_reviews (mod_id);

-- ── RLS ──
alter table public.mod_reviews enable row level security;

-- Tout le monde (même déconnecté) peut lire les avis
create policy "Lecture publique des avis de mods"
  on public.mod_reviews
  for select
  using (true);

-- Seul un utilisateur connecté peut publier un avis, et uniquement pour lui-même
create policy "Insertion par l'auteur"
  on public.mod_reviews
  for insert
  with check (auth.uid() = user_id);

-- L'auteur peut modifier son propre avis
create policy "Modification par l'auteur"
  on public.mod_reviews
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- L'auteur peut supprimer son propre avis
create policy "Suppression par l'auteur"
  on public.mod_reviews
  for delete
  using (auth.uid() = user_id);
