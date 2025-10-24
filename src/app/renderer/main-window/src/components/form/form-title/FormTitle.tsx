import styles from './Styles.module.scss'

interface Props {

    formTitle: string
}

export function FormTitle({ formTitle }: Props) {

    return (

        <div className={styles.rootWrapper_FormTitle}>

            <h1>{formTitle}</h1>

        </div>
    )
}