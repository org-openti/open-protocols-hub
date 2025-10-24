import type { ExposedFunction } from "@oph/ipc/channels/app-management/user-management/channels/get-the-default-user-directory-of-nostr-profiles.js";

import { ipcRenderer } from "electron";
import { safeInvoke } from "@oph/ipc/channels/app-management/user-management/channels/get-the-default-user-directory-of-nostr-profiles.js";

export const safeGetTheDefaultUserDirectoryOfNostrProfiles: ExposedFunction = () => {

    return safeInvoke(ipcRenderer)
}