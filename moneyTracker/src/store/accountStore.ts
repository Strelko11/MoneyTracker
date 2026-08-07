import { create } from 'zustand'
import { supabase } from '../lib/supabase'


type Account = {
    id: string,
    user_id: string,
    name: string,
    balance: number,
    currency: string,
    created_at: string,
    updated_at: string
}

type AccountState[] = {
    accounts: Account[],
    isLoading: boolean,
    fetchAccounts: () => Promise<void>
}


export const fetchAccounts = create<>