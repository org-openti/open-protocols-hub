import { useEffect } from "react";

import styles from './Styles.module.scss'
import { useUserStateStore } from "../../../../../../app_state/stores/app/user/is-user-logged-store";
import { ContentWrapper } from "../../../../../../components/content_wrapper/ContentWrapper";
import { useUserDashboardLouncher } from "../../../../../../router/ScreensNavigate";

export function LoadingScreen() {

    const { isUserLogged } = useUserStateStore()

    const userDashboardLouncher = useUserDashboardLouncher()

    useEffect(() => {

        if (isUserLogged) {

            userDashboardLouncher()
        }

    }, [isUserLogged, userDashboardLouncher])

    return (

        <div className={styles.rootWrapper_LoadingUserProfileScreen}>

            <ContentWrapper className={styles.contentWrapper}>

                <h1>Loading Profile</h1>

            </ContentWrapper>

        </div>
    )
}