import { NewProfileScreens } from "./util/screens"
import { useNewProfileScreensState } from "./state/stores"
import { NewUserProfileScreen } from "./screens/new-user-profile/NewUserProfileScreen"

export function NewProfileScreensManager() {

    const { screenToDisplay } = useNewProfileScreensState()

    return (

        <>
            {screenToDisplay === NewProfileScreens.NEW_USER_PROFILE && <NewUserProfileScreen />}
        </>
    )
}