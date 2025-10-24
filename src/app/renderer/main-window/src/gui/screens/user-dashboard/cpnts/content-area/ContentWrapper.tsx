import { UserDashboardScreens } from "./util/screens"
import { UserHome } from "./screens/user-home/UserHome"
import { useUserDashboardScreensStore } from "../../state/dashboard-content-screens/dashboard-screen-store"
import { NostrScreen } from "./screens/nostr/NostrScreen"

export function ContentArea() {

    const { screenToDisplay } = useUserDashboardScreensStore()

    return (

        <>
            {screenToDisplay === UserDashboardScreens.USER_HOME && <UserHome />}
            {screenToDisplay === UserDashboardScreens.NOSTR && <NostrScreen />}
        </>
    )
}