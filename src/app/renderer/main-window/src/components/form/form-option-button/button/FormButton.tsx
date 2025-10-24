import styles from './Styles.module.scss'

export function FormButton(props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {

    return (
        <button
            {...props}
            className={styles.formButton}
        >
            {props.children}
        </button>
    )
}