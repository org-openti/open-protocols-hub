import { useNavigate } from "react-router-dom"
import { RoutesPath } from "./util/RoutesPath"
import { useLoadUserProfileParamsStore } from "../gui/screens/load-user-profile/state/stores"

export function useLoadUserProfileScreenLouncher() {

    const navigate = useNavigate()

    const { setUserInitFilePath } = useLoadUserProfileParamsStore()

    return (initFilePath: string) => {

        setUserInitFilePath(initFilePath)

        navigate(RoutesPath.LoadUserProfileScreen)
    }
}

export function useWelcomeScreenLouncher() {

    const navigate = useNavigate()

    return () => {

        navigate(RoutesPath.WelcomeScreen)
    }
}

export function useUserDashboardLouncher() {

    const navigate = useNavigate()

    return () => {

        navigate(RoutesPath.USER_DASHBOARD)
    }
}