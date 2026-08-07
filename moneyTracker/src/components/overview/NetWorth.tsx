import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Account = {
    id: string,
    user_id: string,
    name: string,
    balance: number,
    currency: string,
    created_at: string,
    updated_at: string
}
export default function NetWorth() {
    const [accounts, setAccounts] = useState<Account[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const netWorth = accounts.reduce((sum, account) => sum + account.balance, 0)

    useEffect(() => {
        async function loadData() {
            const { data, error } = await supabase.from('accounts').select('*')
            if (error) {
                console.error(error)
                setIsLoading(false)
                return
            }
            setIsLoading(false)
            setAccounts(data ?? [])

        }
        loadData()
    }, [])


    return (
        <>
            <div>
                <p style={styles.NetWorthText}>NET WORTH</p>
                <div style={styles.NetWorthNumber}>
                    <p>{isLoading ? "..." : `${netWorth}`}</p>
                    <p>{accounts[0]?.currency === "EUR" ? `€` : `$` }</p>
                </div>
                <p>+ 3000 $</p>
            </div>

        </>
    )
}

const styles = {
    NetWorthText: {
        color: "var(--color-accent-500)"
    },

    NetWorthNumber: {
        display: "flex",
        gap: "2px"
    }
}