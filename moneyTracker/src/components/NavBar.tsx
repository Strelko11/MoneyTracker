import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function NavBar() {

    const [email, setEmail] = useState<string | null>(null)


    useEffect(() => {
        async function loadUser() {
            const { data: { user } } = await supabase.auth.getUser()
            setEmail(user?.email ?? null)
        }
        loadUser()
    }, [])

    return (
        <div style={styles.container}>
            <h1>Ledger</h1>
            <div style={styles.navWrapper}>
                <NavLink to="/overview" style={styles.navlink}>Overview</NavLink>
                <NavLink to="/investments" style={styles.navlink}>Investments</NavLink>
                <NavLink to="/expenses" style={styles.navlink}>Expenses</NavLink>
            </div>
            <div style={styles.signOutContainer}>
                <button style={styles.button}>Sign Out</button>
                <p>{email}</p>
            </div>
            

        </div>
    )
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        borderBottom: "0.5px solid var(--color-divider)",
    },
    navWrapper: {
        display: "flex",
        gap: "24px"
    },
    navlink: {
        color: 'var(--color-text)',
        textDecoration: "none",
    },
    signOutContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "24px"
    },
    button: {
        color: "var(--color-accent-600)",
        backgroundColor: "transparent",
        borderRadius: "6px",
        width: "100px",
        height: "30px"
    },
}