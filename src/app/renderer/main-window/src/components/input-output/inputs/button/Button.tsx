import styles from './Styles.module.scss'

export function Button(props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {

    return (

        <button
            {...props}
            className={styles.button}
        >
            {props.children}
        </button>
    )
}