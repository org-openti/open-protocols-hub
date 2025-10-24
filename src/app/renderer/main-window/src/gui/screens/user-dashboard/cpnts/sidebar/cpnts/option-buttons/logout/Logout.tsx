import { useAppThemeStore } from '../../../../../../../../app_state/stores/app/settings/app-theme-store'
import ipc from '../../../../../../../../ipc/listeners/ipc-client'
import { OptionButtonBase } from '../OptionButtonBase'


import logoutIconDarkTheme from './assets/logout-icon-dark-theme.ico'
import logoutIconLightTheme from './assets/logout-icon-light-theme.ico'

export function LogoutButton() {

    function logout() {

        ipc.appManagement.userManagement.logoutUser()
    }

    const { appTheme } = useAppThemeStore()

    let iconPath = ''

    switch (appTheme) {

        case 'dark': iconPath = logoutIconDarkTheme;
            break

        case 'light': iconPath = logoutIconLightTheme;
            break
    }

    return (

        <OptionButtonBase
            iconPath={iconPath}
            isSelected={false}
            onClick={logout}
        />
    )
}