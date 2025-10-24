import { useAppThemeStore } from '../../../../../../../../app_state/stores/app/settings/app-theme-store'
import { useUserDashboardScreensStore } from '../../../../../state/dashboard-content-screens/dashboard-screen-store'
import { UserDashboardScreens } from '../../../../content-area/util/screens'
import { OptionButtonBase } from '../OptionButtonBase'

import nostrIconDarkTheme from './assets/nostr-icon-dark-theme.ico'
import nostrIconLightTheme from './assets/nostr-icon-light-theme.ico'

export function NostrButton() {

    const { setScreenToDisplay, screenToDisplay } = useUserDashboardScreensStore()
    
    const { appTheme } = useAppThemeStore()

    let iconPath = ''

    switch (appTheme) {

        case 'dark': iconPath = nostrIconDarkTheme;
            break

        case 'light': iconPath = nostrIconLightTheme;
            break
    }

    return (

        <OptionButtonBase
            iconPath={iconPath}
            isSelected={screenToDisplay === UserDashboardScreens.NOSTR}
            onClick={() => {
                setScreenToDisplay(UserDashboardScreens.NOSTR)
            }}
        />
    )
}