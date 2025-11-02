import type { Args } from "@oph/ipc/channels/main-window/app-management/user-management/channels/load-user-profile.js";

import { ipcRenderer } from "electron";
import { configureRendererSideChannel } from "@oph/ipc/channels/main-window/app-management/user-management/channels/load-user-profile.js";

export function loadUserProfileFunctionImplementation(userProfileInitFilePath: Args) {

    return configureRendererSideChannel(ipcRenderer, userProfileInitFilePath)
}