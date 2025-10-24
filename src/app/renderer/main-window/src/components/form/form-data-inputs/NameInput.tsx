import { InputLabel } from './cpnts/InputLabel'
import styles from './Styles.module.scss'

export function NameInput(props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {

    return (

        <div className={styles.rootWrapper_NameInput}>
            <InputLabel children='Name:' />
            <input {...props} type="text" />
        </div>
    )
}