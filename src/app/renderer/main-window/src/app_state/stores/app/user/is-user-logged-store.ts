import { createStore, useStore } from "zustand";

type IsUserLoggedState = {

    isUserLogged: boolean
    setUserLoggedValue: (userLoggedState: boolean) => void
}

export const isUserLoggedStore = createStore<IsUserLoggedState>((set) => ({
    
    isUserLogged: false,
    setUserLoggedValue: (profile) => set({ isUserLogged: profile }),
}))

export function useUserStateStore(){

    return useStore(isUserLoggedStore)
}

export function isUserLoggedUpdateListener(newIsUserLoggedValue: boolean) {
    
    isUserLoggedStore.getState().setUserLoggedValue(newIsUserLoggedValue)
}