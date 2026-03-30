// 1. Base User Profile
export interface Profile {
  id: string
  user_id: string | null
  email: string
  first_name: string | null
  last_name: string | null
  phone: string | null
  is_guest: boolean
  created_at: string
}

// 2. Tournament Entity
export type TournamentStatus = 'open' | 'in_progress' | 'completed'

export interface Tournament {
  id: string
  name: string
  description: string | null
  organizer_id: string
  status: TournamentStatus
  start_date: string
  end_date: string
  location: string | null
  // prize: string | null
  // flyer_url: string | null
  created_at: string
  // Joins (Optional fields for when we fetch related data)
  // organizer?: Profile
}

export interface TournamentView extends Tournament {
  organizer_name: string;
  time_status: 'upcoming' | 'in_progress' | 'finished';
}

// 3. Registration (The approval flow)
export type RegistrationStatus = 'pending' | 'accepted' | 'rejected'

export interface Registration {
  id: string
  tournament_id: string
  player_1_id: string
  player_2_id: string
  created_by: string
  status: RegistrationStatus
  created_at: string
  // Join fields
  player_1?: Profile
  player_2?: Profile
  tournament?: Tournament
}

// 4. Teams (The Duo)
export interface Team {
  id: string
  p1_id: string
  p2_id: string
  tournament_id: string
  // Join fields
  p1?: Profile
  p2?: Profile
}

// 5. Match Data
export interface Match {
  id: string
  tournament_id: string
  team_a_id: string | null
  team_b_id: string | null
  score: string | null
  winner_id: string | null
  round_number: number
  match_date: string | null
  // Join fields
  team_a?: Team
  team_b?: Team
}

// 6. Auth User (derived from Supabase)
export interface AuthUser {
  id: string
  email: string
  profile?: Profile
}