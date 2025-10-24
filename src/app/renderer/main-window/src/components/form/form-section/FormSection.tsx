import styles from './Styles.module.scss'

interface FormWrapperProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

    sectionTitle?: string
}

export function FormSection({ sectionTitle, ...rest }: FormWrapperProps) {

    return (

        <div {...rest} className={styles.rootWrapper_sectionWrapper}>

            {sectionTitle && <h1 className={styles.sectionTitle}>{sectionTitle}</h1>}

            <div className={styles.sectionBody}>

                {rest.children}

            </div>

        </div>
    )
}