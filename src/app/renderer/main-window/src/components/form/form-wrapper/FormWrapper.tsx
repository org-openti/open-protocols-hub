import styles from './Styles.module.scss'

interface FormBackgrowndWrapperProps {

    children: React.ReactNode
}

export function FormWrapper({ children }: FormBackgrowndWrapperProps) {

    return (

        <div className={styles.rootWrapper_FormBackgrowndWrapper}>

            {children}

        </div>
    )
}