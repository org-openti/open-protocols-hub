import type {IpcMain, IpcRenderer} from 'electron'

import type { PublicUserProfileData } from "@oph/types/app/user/user-profile-data.js"

const CHANEL_NAME = 'request-public-user-profile-data'

export type ExposedFunction = () => Promise<PublicUserProfileData | null>

export type RpupdDataRequestFunction = () => PublicUserProfileData | null

export function configureMainSideChannel(ipcMainHandle: IpcMain, requestFunction: RpupdDataRequestFunction) {

        ipcMainHandle.handle(CHANEL_NAME, () => {

        return new Promise<PublicUserProfileData | null>((resolve) => {

            resolve(requestFunction())
        })
    })
}

export function configureRendererSideChannel(ipcRenderer: IpcRenderer): Promise<PublicUserProfileData | null> {

    return new Promise((resolve) => {

        ipcRenderer.invoke(CHANEL_NAME).then((value) => {

            resolve(value)
        })
    })
}