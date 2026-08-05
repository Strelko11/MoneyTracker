import NavBar from "../components/NavBar";

export default function Overview() {
    return (
        <>
            <NavBar />
            <div>
                <p style={styles.NetWorth}>NET WORTH</p>
                <p>100 000$</p>
                <p>+ 3000 $</p>
            </div>
            
        </>
    )
}

const styles = {
    NetWorth: {
        color: "var(--color-accent-500)"
    }
}