import type { ExposedFunction } from "@oph/ipc/channels/app-management/user-management/channels/request-public-user-profile-data.js";

import { ipcRenderer } from "electron";
import { configureRendererSideChannel } from "@oph/ipc/channels/app-management/user-management/channels/request-public-user-profile-data.js";

export const getUserProfileData: ExposedFunction = () => {

    return configureRendererSideChannel(ipcRenderer)
}