import type { ExposedFunction } from "@oph/ipc/channels/protocols-modules/nostr-management/channels/create-nostr-profile.js";

import { ipcRenderer } from "electron";
import { handleRendererInvoke } from "@oph/ipc/channels/protocols-modules/nostr-management/channels/create-nostr-profile.js";

export const createNostrProfile: ExposedFunction = (args) => {

    return handleRendererInvoke(ipcRenderer, args)
}