import { useAppThemeStore } from "../../../../../../../../app_state/stores/app/settings/app-theme-store";
import { useUserDashboardScreensStore } from "../../../../../state/dashboard-content-screens/dashboard-screen-store";
import { UserDashboardScreens } from "../../../../content-area/util/screens";
import { OptionButtonBase } from "../OptionButtonBase";

import homeIconDarkTheme from './assets/home-icon-dark-theme.ico'
import homeIconLightTheme from './assets/home-icon-light-theme.ico'

export function HomeButton() {

    const { setScreenToDisplay, screenToDisplay } = useUserDashboardScreensStore()

    const { appTheme } = useAppThemeStore()

    let iconPath = ''

    switch (appTheme) {

        case 'dark': iconPath = homeIconDarkTheme;
            break

        case 'light': iconPath = homeIconLightTheme;
            break
    }
    
    return (

        <OptionButtonBase
            iconPath={iconPath}
            isSelected={screenToDisplay === UserDashboardScreens.USER_HOME}
            onClick={() => { setScreenToDisplay(UserDashboardScreens.USER_HOME) }}
        >
        </OptionButtonBase>
    )
}