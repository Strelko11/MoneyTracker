type ButtonProps = {
    label: string
    onClick: () => void
}

export default function Button({ label, onClick }: ButtonProps) {

    return (
        <>
            <button onClick={onClick} style={styles.button}>{label}</button>
        </>
    )
}

const styles = {
    button: {
        backgroundColor: 'var(--color-accent)',
        //fontFamily: "arial",
        fontFamily: 'var(--font-body)',
        color: 'var(--color-text)',
        borderRadius: "8px",
    }
}
