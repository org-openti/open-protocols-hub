import type { ExposedFunction } from "@oph/ipc/channels/main-window/app-management/user-management/channels/user-session-state.js"

import { ipcRenderer } from "electron"
import { configureRendererSideChannel  } from "@oph/ipc/channels/main-window/app-management/user-management/channels/user-session-state.js"

export const setIsUserLoggedChangeListener: ExposedFunction = (changeListener) => {

    return configureRendererSideChannel(ipcRenderer, changeListener)
}