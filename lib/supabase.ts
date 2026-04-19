import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// TypeScript types matching our tables
export type Donation = {
  id?: string
  created_at?: string
  name: string
  email: string
  amount: number
  type: string
  gift_aid: boolean
  dedication?: string
  payment_method: string
  status?: string
}

export type ContactMessage = {
  id?: string
  created_at?: string
  first_name: string
  last_name: string
  email: string
  subject: string
  message: string
}

export type Fundraising = {
  id: number
  total_raised: number
  target: number
  updated_at: string
}
