-- =============================================
-- PadelDraw Database Setup
-- Run this in Supabase SQL Editor
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- PROFILES TABLE
-- Links to auth.users
-- =============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  is_guest BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- =============================================
-- TOURNAMENTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.tournaments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  organizer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  status TEXT CHECK (status IN ('open', 'in_progress', 'completed')) DEFAULT 'open',
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  location TEXT,
  prize TEXT,
  flyer_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.tournaments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for tournaments
CREATE POLICY "Tournaments are viewable by everyone" ON public.tournaments
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create tournaments" ON public.tournaments
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Organizers can update own tournaments" ON public.tournaments
  FOR UPDATE USING (auth.uid() = organizer_id);

CREATE POLICY "Organizers can delete own tournaments" ON public.tournaments
  FOR DELETE USING (auth.uid() = organizer_id);

-- =============================================
-- TEAMS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.teams (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tournament_id UUID REFERENCES public.tournaments(id) ON DELETE CASCADE,
  p1_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  p2_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

-- RLS Policies for teams
CREATE POLICY "Teams are viewable by everyone" ON public.teams
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create teams" ON public.teams
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- =============================================
-- REGISTRATIONS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tournament_id UUID REFERENCES public.tournaments(id) ON DELETE CASCADE,
  player_1_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  player_2_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  status TEXT CHECK (status IN ('pending', 'accepted', 'rejected')) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for registrations
CREATE POLICY "Registrations are viewable by everyone" ON public.registrations
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create registrations" ON public.registrations
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Tournament organizers can update registrations" ON public.registrations
  FOR UPDATE USING (
    auth.uid() = (
      SELECT organizer_id 
      FROM public.tournaments 
      WHERE id = tournament_id
    )
  );

-- =============================================
-- MATCHES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.matches (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tournament_id UUID REFERENCES public.tournaments(id) ON DELETE CASCADE,
  team_a_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  team_b_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  score TEXT,
  winner_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  round_number INTEGER DEFAULT 1,
  match_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;

-- RLS Policies for matches
CREATE POLICY "Matches are viewable by everyone" ON public.matches
  FOR SELECT USING (true);

CREATE POLICY "Tournament organizers can manage matches" ON public.matches
  FOR ALL USING (
    auth.uid() = (
      SELECT organizer_id 
      FROM public.tournaments 
      WHERE id = tournament_id
    )
  );

-- =============================================
-- AUTO-CREATE PROFILE ON USER SIGNUP
-- =============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, user_id, email, first_name, last_name, is_guest)
  VALUES (
    NEW.id,
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    false
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- SAMPLE DATA (Optional - for testing)
-- =============================================

-- Insert sample organizer if not exists
-- INSERT INTO public.profiles (id, user_id, email, first_name, last_name, is_guest)
-- VALUES 
--   ('11111111-1111-4111-8111-111111111111', NULL, 'organizer@example.com', 'John', 'Organizer', false),
--   ('22222222-2222-4222-8222-222222222222', NULL, 'organizer2@example.com', 'Jane', 'Organizer', false)
-- ON CONFLICT (id) DO NOTHING;

-- Insert sample tournaments
-- INSERT INTO public.tournaments (id, title, description, organizer_id, status, start_date, end_date, location, prize)
-- VALUES 
--   ('f0000000-0000-4000-8000-000000000001', 'City Open Doubles', 'Annual city open doubles tournament', '11111111-1111-4111-8111-111111111111', 'open', '2025-07-12', '2025-07-15', 'City Sports Club', '500 USD'),
--   ('f0000000-0000-4000-8000-000000000002', 'Summer Invitational', 'Summer championship', '22222222-2222-4222-8222-222222222222', 'in_progress', '2025-06-20', '2025-06-23', 'Beach Courts', '1000 USD'),
--   ('f0000000-0000-4000-8000-000000000003', 'Regional Championship', 'Regional championship', '11111111-1111-4111-8111-111111111111', 'open', '2025-08-02', '2025-08-05', 'Regional Stadium', '2000 USD')
-- ON CONFLICT (id) DO NOTHING;
