import { useAppThemeStore } from '../../../../../../../../app_state/stores/app/settings/app-theme-store'
import { OptionButtonBase } from '../OptionButtonBase'

import themeIconDarkTheme from './assets/theme-icon-dark-theme.ico'
import themeIconLightTheme from './assets/theme-icon-light-theme.ico'

export function ThemeButton() {
    
    const { appTheme, toogle } = useAppThemeStore()

    let iconPath = ''

    switch (appTheme) {

        case 'dark': iconPath = themeIconDarkTheme;
            break

        case 'light': iconPath = themeIconLightTheme;
            break
    }

    return (

        <OptionButtonBase
            iconPath={iconPath}
            isSelected={false}
            onClick={toogle}
        />
    )
}