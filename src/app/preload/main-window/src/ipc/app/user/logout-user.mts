import type { ExposedFunction } from "@oph/ipc/channels/main-window/app-management/user-management/channels/logout-user.js";

import { ipcRenderer } from "electron";
import { configureIpcRendererTypesafe } from "@oph/ipc/channels/main-window/app-management/user-management/channels/logout-user.js";

export const logoutUser: ExposedFunction = () => {

    return configureIpcRendererTypesafe(ipcRenderer)
}