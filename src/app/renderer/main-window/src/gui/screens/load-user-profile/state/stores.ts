import { create, useStore } from "zustand"

//{---------------- Load User Profile Screen Params Store
export type LoadUserProfileParamsState = {

    initFilePath: string | null

    setUserInitFilePath: (initFilePath: string | null) => void

    clear: () => void
}

export const loadUserProfileParamsStore = create<LoadUserProfileParamsState>((set) => ({

    initFilePath: null,
    setUserInitFilePath: (filePath) => set({ initFilePath: filePath }),
    clear: () => set({ initFilePath: null })
}))

export function useLoadUserProfileParamsStore() {

    return useStore(loadUserProfileParamsStore)
}
//----------------}

//{---------------- Load User Profile Screen Store
export type LoadUserProfileState = {

    userName: string | null

    setUserName: (userName: string | null) => void
}

export const userProfileStore = create<LoadUserProfileState>((set) => ({

    userName: null,
    setUserName: (userName) => set({ userName: userName })
}))

export function useLoadUserProfileStore() {

    return useStore(userProfileStore)
}
//----------------