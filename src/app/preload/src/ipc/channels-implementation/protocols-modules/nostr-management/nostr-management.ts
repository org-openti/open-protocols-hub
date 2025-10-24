import type { NostrManagement } from "@oph/ipc/channels/protocols-modules/nostr-management/nostr-management.js";

import { createNostrProfile } from "./channels/create-nostr-profile.js";

export const nostrManagement: NostrManagement = {

    createNostrProfile: createNostrProfile
}