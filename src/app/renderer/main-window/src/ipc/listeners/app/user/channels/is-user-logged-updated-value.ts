import { isUserLoggedUpdateListener } from "../../../../../app_state/stores/app/user/is-user-logged-store"
import ipc from "../../../ipc-client"

export function configureIsUserLoggedUpdatedValueChangeListener() {

    ipc.appManagement.userManagement.setIsUserLoggedUpdatedValueChangeListener((isUserLoggedChange) => {

        switch (isUserLoggedChange) {

            case "LOGGED_IN": isUserLoggedUpdateListener(true)
                break

            case "LOGGED_OUT": isUserLoggedUpdateListener(false)
                break

            default: isUserLoggedUpdateListener(false)
        }
    })
}