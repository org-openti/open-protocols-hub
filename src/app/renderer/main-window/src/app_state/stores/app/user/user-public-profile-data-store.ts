import type { PublicUserProfileData } from "@oph/types/app/user/user-profile-data.js"
import { createStore, useStore } from "zustand"

export type PublicUserProfileDataState = {

    publicUserProfileData: PublicUserProfileData | null

    setPublicUserProfileData: (newPublicUserProfileDataValue: PublicUserProfileData | null) => void
}

export const publicUserProfileDataStore = createStore<PublicUserProfileDataState>((set) => ({

    publicUserProfileData: null,
    setPublicUserProfileData: (useUserDashboardScreensStore) => {

        set({ publicUserProfileData: useUserDashboardScreensStore })
    }
}))

export function usePublicUserProfileDataStore(){

    return useStore(publicUserProfileDataStore)
}

export function userPublicProfileDataUpdaterListener(publicUserPrifileDataChange: PublicUserProfileData | null) {

    publicUserProfileDataStore.getState().setPublicUserProfileData(publicUserPrifileDataChange)
}