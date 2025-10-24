import classNames from 'classnames'
import styles from './Styles.module.scss'

export function ContentWrapper(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {

    const cnms_rootWrapper = classNames(props.className, styles.rootWrapper_ContentWrapper)
    
    return (

        <div
            {...props}
            className={cnms_rootWrapper}
        >
            <div className={styles.internalWrapper}>

                {props.children}
            </div>
        </div>
    )
}