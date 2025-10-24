import { LoadUserProfileScreensManager } from "./screens-management/ScreensManager";
import { useCallback, useEffect } from "react";
import { useLoadUserProfileParamsStore } from "./state/stores";
import { useLoadUserProfileScreensState } from "./screens-management/state/stores";
import { LoadUserProfileScreens } from "./screens-management/util/screens";

import styles from './Styles.module.scss'
import ipc from "../../../ipc/listeners/ipc-client";
import { useUserStateStore } from "../../../app_state/stores/app/user/is-user-logged-store";
import { useUserDashboardLouncher } from "../../../router/ScreensNavigate";
import { ContentWrapper } from "../../../components/content_wrapper/ContentWrapper";

export function LoadUserProfileScreen() {

    const { initFilePath, clear } = useLoadUserProfileParamsStore()

    const { isUserLogged } = useUserStateStore()

    const { setScreenToDisplay } = useLoadUserProfileScreensState()

    const userDashboardLouncher = useUserDashboardLouncher()

    const loadUserProfile = useCallback(async (initFilePath: string) => {

        setScreenToDisplay(LoadUserProfileScreens.LOADING)

        ipc.appManagement.userManagement.loadUserProfile(initFilePath)

    }, [setScreenToDisplay])

    useEffect(() => {

        if (initFilePath) {

            loadUserProfile(initFilePath)
        }

        return () => {

            clear()
        }

    }, [initFilePath, clear, loadUserProfile])

    useEffect(() => {

        if (isUserLogged) {

            userDashboardLouncher()
        }

    }, [isUserLogged, userDashboardLouncher])

    return (

        <div className={styles.rootWrapper_LoadUserProfileScreen}>

            <ContentWrapper className={styles.contentWrapper}>

                <LoadUserProfileScreensManager />

            </ContentWrapper>

        </div>
    )
}