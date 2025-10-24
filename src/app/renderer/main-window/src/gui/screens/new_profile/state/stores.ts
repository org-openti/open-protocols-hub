import { createStore, useStore } from "zustand"

export type NewUserProfileState = {

    directoryPath: string | null

    setUserProfileDirectory: (directoryPath: string) => void
}

export const userProfileStore = createStore<NewUserProfileState>((set) => ({

    directoryPath: null,
    setUserProfileDirectory: (directoryPath) => set({directoryPath})

}))

export function useUserProfileStore() {

    return useStore(userProfileStore)
}