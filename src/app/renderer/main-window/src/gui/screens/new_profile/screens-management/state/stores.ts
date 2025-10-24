import { createStore, useStore } from "zustand"
import { NewProfileScreens } from "../util/screens"

export type NewProfileScreensState = {

    screenToDisplay: NewProfileScreens

    setScreenToDisplay: (screenToDisplay: NewProfileScreens) => void
}

export const newProfileScreensStore = createStore<NewProfileScreensState>((set) => ({

    screenToDisplay: NewProfileScreens.NEW_USER_PROFILE,
    setScreenToDisplay: (screenToDisplay) => set({ screenToDisplay })

}))

export function useNewProfileScreensState() {

    return useStore(newProfileScreensStore)
}