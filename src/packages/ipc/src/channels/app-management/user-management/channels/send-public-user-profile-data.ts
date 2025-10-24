import type { BrowserWindow, IpcRenderer } from "electron";
import type { PublicUserProfileData } from "@oph/types/app/user/user-profile-data.js";

const CHANEL_NAME = 'send-public-user-profile-data'

export type ExposedFunction = (listener: (publicUserProfileDataChange: PublicUserProfileData | null) => void) => void

export function configureMainSideChannel(

    browserWindow: BrowserWindow,
    dataUpdaterProvider: (listener: (publicUserProfileDataChange: PublicUserProfileData | null) => void) => void

) {

    dataUpdaterProvider((publicUserProfileDataChange) => {

        browserWindow.webContents.send(CHANEL_NAME, publicUserProfileDataChange)
    })
}

export function configureRedererSideChannel(

    ipcRenderer: IpcRenderer,
    exposedFunction: (publicUserProfileDataChange: PublicUserProfileData | null) => void

) {

    ipcRenderer.on(CHANEL_NAME, (_, value) => {

        exposedFunction(value)
    })
}