import styles from './Styles.module.scss'

interface InputLabelProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {

    children: string
}
export function InputLabel(props: InputLabelProps) {

    return (

        <span
            {...props}
            className={styles.inputLabel}
        >
            {props.children}
        </span>
    )
}