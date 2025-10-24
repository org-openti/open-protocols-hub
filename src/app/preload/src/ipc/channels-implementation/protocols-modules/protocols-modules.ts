import type { ProtocolsModules } from "@oph/ipc/channels/protocols-modules/protocols-modules.js";

import { nostrManagement } from "./nostr-management/nostr-management.js";

export const protocolsModules: ProtocolsModules = {

    nostrManagement: nostrManagement
}