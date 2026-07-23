import Button from "../components/Button"

export default function Login() {

    function handleSignIn(){
        console.log("Trying to sign in")
    }

    return (
        <>
            <div style={styles.container}>
                <h1>Welcome</h1>
                <input placeholder="Email" style={styles.input}></input>
                <input style={styles.input}></input>
                <Button label="Sign in" onClick={handleSignIn}></Button>
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
