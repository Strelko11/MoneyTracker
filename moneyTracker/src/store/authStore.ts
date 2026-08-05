import { create } from 'zustand'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

type AuthState = {
    session: Session | null
    isLoading: boolean
}

export const useAuthStore = create<AuthState>((set) => {
    supabase.auth.getSession().then(({ data: { session } }) => {
        set({ session, isLoading: false })
    })

    supabase.auth.onAuthStateChange((_event, session) => {
        set({ session, isLoading: false })
    })

    return {
        session: null,
        isLoading: true,
    }
})
