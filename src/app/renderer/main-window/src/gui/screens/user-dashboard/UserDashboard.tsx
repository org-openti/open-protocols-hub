import { useEffect } from "react"
import { ContentArea } from "./cpnts/content-area/ContentWrapper"
import { UserDashboardSidebar } from "./cpnts/sidebar/UserDashboardSidebar"

import styles from './Styles.module.scss'
import ipc from "../../../ipc/listeners/ipc-client"
import { useWelcomeScreenLouncher } from "../../../router/ScreensNavigate"
import { useUserStateStore } from "../../../app_state/stores/app/user/is-user-logged-store"

export function UserDashboard() {

    const welcomeScreenLouncher = useWelcomeScreenLouncher()

    const { isUserLogged } = useUserStateStore()

    useEffect(() => {

        if (!isUserLogged) {

            welcomeScreenLouncher()
        }

    }, [isUserLogged, welcomeScreenLouncher])

    useEffect(() => {

        ipc.appManagement.userManagement.getNostrUserProfilesReferences().then((value) => {

            console.log(value)
        })
        
    }, [])

    return (

        <div className={styles.rootWrapper_UserDashboard}>

            <UserDashboardSidebar />

            <ContentArea />

        </div>
    )
}