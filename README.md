# Creovate

A bilingual (Arabic/English), dark-first creator directory and community starter built with Next.js App Router, TypeScript, Tailwind CSS, and Supabase.

## Included
- Responsive dark landing page with language toggle (UI-level starter)
- Creator discovery cards and category filters
- Creator profile route (`/creators/[slug]`)
- Supabase SQL schema, indexes, triggers, and Row Level Security policies
- Environment variable template

## Run locally
1. Install Node.js 20+.
2. Copy `.env.example` to `.env.local` and fill in your Supabase project values.
3. Run `npm install`
4. Run `npm run dev`
5. Open http://localhost:3000

The UI uses sample creator data until Supabase is connected. Authentication and live database queries are intentionally the next integration step.

## Supabase setup
1. Create a Supabase project.
2. Open SQL Editor.
3. Run `supabase/schema.sql`.
4. Add the project URL and anon key to `.env.local`.

## Important
- Never put the Supabase `service_role` key in a browser-exposed variable.
- RLS is enabled on user data tables. Test policies with separate user accounts before launch.
- Social account follower counts are creator-entered placeholders until official API integrations are implemented.
