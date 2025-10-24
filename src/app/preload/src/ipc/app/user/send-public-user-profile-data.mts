import type { ExposedFunction } from "@oph/ipc/channels/app-management/user-management/channels/send-public-user-profile-data.js"

import { ipcRenderer } from "electron"
import { configureRedererSideChannel } from "@oph/ipc/channels/app-management/user-management/channels/send-public-user-profile-data.js"

export const setPublicUserProfileDataChangeListener: ExposedFunction = (changeListener) => {

    return configureRedererSideChannel(ipcRenderer, changeListener)
}