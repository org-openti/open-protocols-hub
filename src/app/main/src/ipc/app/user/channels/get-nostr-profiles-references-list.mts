import type { NostrProfileReference } from "@oph/schemas/app/user/nostr-profile-reference.js";

import { ipcMain } from "electron";
import { linkMainSide } from "@oph/ipc/channels/app-management/user-management/channels/get-nostr-profiles-list.js";
import { getNostrProfilesReferences } from "../../../../user-session/user-session.mjs";

export function configureGetNostrProfilesReferencesList() {

    linkMainSide(ipcMain, () => {

        return getNostrProfilesReferences().map((nostrProfilesInitFilePath) => {

            const nostrUserProfileReference: NostrProfileReference = {

                nostrInitFilePath: nostrProfilesInitFilePath.nostrInitFilePath,
                publicIdentifier: nostrProfilesInitFilePath.publicIdentifier
            }

            return nostrUserProfileReference
        })

    })
}