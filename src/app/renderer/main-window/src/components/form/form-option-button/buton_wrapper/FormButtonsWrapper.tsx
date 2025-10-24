import styles from './Styles.module.scss'

export function FormButtonsWrapper(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {

    return (
        <div
            {...props}
            className={styles.rootWrapper_ButtonsWrapper}
        >
            {props.children}
        </div>
    )
}