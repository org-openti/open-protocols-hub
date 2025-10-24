import { createStore, useStore } from "zustand";

type AppTheme = 'light' | 'dark'

type IsUserLoggedState = {

    appTheme: AppTheme
    setAppTheme: (newAppThemeValue: AppTheme) => void
    toogle: () => void
}

export const appThemeStore = createStore<IsUserLoggedState>((set, get, api) => {

    api.subscribe((state) => {

        document.documentElement.setAttribute('app-theme', state.appTheme);
    })

    const initialValue: AppTheme = 'dark'

    document.documentElement.setAttribute('app-theme', initialValue);

    function setAppTheme(newAppThemeValue: AppTheme) {

        set({ appTheme: newAppThemeValue })
    }

    function toogle() {

        switch (get().appTheme) {


            case "light": setAppTheme('dark')
                break

            case "dark": setAppTheme('light')
                break
        }
    }

    return {

        appTheme: initialValue,
        setAppTheme: setAppTheme,
        toogle: toogle
    }
})

export function useAppThemeStore() {

    return useStore(appThemeStore)
}