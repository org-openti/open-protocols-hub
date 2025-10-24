import { createStore, useStore } from "zustand"
import { LoadUserProfileScreens } from "../util/screens"

export type LoadUserProfileScreensState = {

    screenToDisplay: LoadUserProfileScreens

    setScreenToDisplay: (screenToDisplay: LoadUserProfileScreens) => void
}

export const newProfileScreensStore = createStore<LoadUserProfileScreensState>((set) => ({

    screenToDisplay: LoadUserProfileScreens.LOADING,
    setScreenToDisplay: (screenToDisplay) => set({ screenToDisplay })
}))

export function useLoadUserProfileScreensState() {

    return useStore(newProfileScreensStore)
}