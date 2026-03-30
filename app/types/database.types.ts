export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string | null
          email: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          is_guest: boolean
          created_at: string
        }
        Insert: {
          id: string
          user_id?: string | null
          email: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          is_guest?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          email?: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          is_guest?: boolean
          created_at?: string
        }
      }
      tournaments: {
        Row: {
          id: string
          title: string
          description: string | null
          organizer_id: string | null
          status: 'open' | 'in_progress' | 'completed'
          start_date: string
          end_date: string
          location: string | null
          prize: string | null
          flyer_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          organizer_id?: string | null
          status?: 'open' | 'in_progress' | 'completed'
          start_date: string
          end_date: string
          location?: string | null
          prize?: string | null
          flyer_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          organizer_id?: string | null
          status?: 'open' | 'in_progress' | 'completed'
          start_date?: string
          end_date?: string
          location?: string | null
          prize?: string | null
          flyer_url?: string | null
          created_at?: string
        }
      }
      teams: {
        Row: {
          id: string
          tournament_id: string | null
          p1_id: string | null
          p2_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          tournament_id?: string | null
          p1_id?: string | null
          p2_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          tournament_id?: string | null
          p1_id?: string | null
          p2_id?: string | null
          created_at?: string
        }
      }
      registrations: {
        Row: {
          id: string
          tournament_id: string | null
          player_1_id: string | null
          player_2_id: string | null
          created_by: string | null
          status: 'pending' | 'accepted' | 'rejected'
          created_at: string
        }
        Insert: {
          id?: string
          tournament_id?: string | null
          player_1_id?: string | null
          player_2_id?: string | null
          created_by?: string | null
          status?: 'pending' | 'accepted' | 'rejected'
          created_at?: string
        }
        Update: {
          id?: string
          tournament_id?: string | null
          player_1_id?: string | null
          player_2_id?: string | null
          created_by?: string | null
          status?: 'pending' | 'accepted' | 'rejected'
          created_at?: string
        }
      }
      matches: {
        Row: {
          id: string
          tournament_id: string | null
          team_a_id: string | null
          team_b_id: string | null
          score: string | null
          winner_id: string | null
          round_number: number
          match_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          tournament_id?: string | null
          team_a_id?: string | null
          team_b_id?: string | null
          score?: string | null
          winner_id?: string | null
          round_number?: number
          match_date?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          tournament_id?: string | null
          team_a_id?: string | null
          team_b_id?: string | null
          score?: string | null
          winner_id?: string | null
          round_number?: number
          match_date?: string | null
          created_at?: string
        }
      }
    }
  }
}
