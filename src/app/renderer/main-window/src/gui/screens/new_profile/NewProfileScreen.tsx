
import { ContentWrapper } from '../../../components/content_wrapper/ContentWrapper';
import styles from './Styles.module.scss'
import { NewProfileScreensManager } from "./screens-management/ScreensManager";

export function NewProfileScreen() {

    return (

        <div className={styles.rootWrapper_NewProfileScreen}>

            <ContentWrapper className={styles.contentWrapper}>

                <NewProfileScreensManager/>

            </ContentWrapper>
            
        </div>
    )
}