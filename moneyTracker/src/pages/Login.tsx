import Button from "../components/Button"
import { supabase } from "../lib/supabase"
import { useState } from "react"


type Credentials = {
    email: string,
    password: string 
}

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    

    async function handleSignIn({email, password} : Credentials){
       const {error} = await supabase.auth.signInWithPassword({email,password})
       if(error){
            console.log("Login failed")
       }
       else{
            console.log("login successful")
       }
    }

    return (
        <>
            <div style={styles.container}>
                <h1>Welcome</h1>
                <input placeholder="Email" style={styles.input} value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                <input placeholder="Password" type="password" style={styles.input} value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                <Button label="Sign in" onClick={() => handleSignIn({email,password})}></Button>
            </div>


        </>
    )



}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column" as const,
        gap: "8px",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        maxWidth: "50%",
        margin: "0 auto",
        padding: "32px"
    },
    input: {
        width: "80%",
        padding: "10px",
        fontSize: "16px",
    },
}
