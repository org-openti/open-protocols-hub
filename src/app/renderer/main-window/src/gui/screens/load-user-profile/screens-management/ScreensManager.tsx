import { LoadUserProfileScreens } from "./util/screens"
import { useLoadUserProfileScreensState } from "./state/stores"
import { LoadingScreen } from "./screens/loading/LoadingScreen"

export function LoadUserProfileScreensManager() {

    const { screenToDisplay } = useLoadUserProfileScreensState()

    return (

        <>
            {screenToDisplay === LoadUserProfileScreens.LOADING && <LoadingScreen />}
        </>
    )
}