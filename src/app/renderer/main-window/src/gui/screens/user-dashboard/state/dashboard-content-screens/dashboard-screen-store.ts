import { createStore, useStore } from "zustand"
import { UserDashboardScreens } from "../../cpnts/content-area/util/screens"

export type UserDashboardScreensState = {

    screenToDisplay: UserDashboardScreens

    setScreenToDisplay: (screenToDisplay: UserDashboardScreens) => void
}

export const UserDashboardScreensStore = createStore<UserDashboardScreensState>((set) => ({

    screenToDisplay: UserDashboardScreens.USER_HOME,
    setScreenToDisplay: (screenToDisplay) => set({ screenToDisplay })
}))

export function useUserDashboardScreensStore() {

    return useStore(UserDashboardScreensStore)
}