import type { ChannelResponse } from "@oph/ipc/channels/main-window/protocols-modules/nostr-management/channels/create-nostr-profile.js";

import { ipcMain } from "electron";
import { createNostrProfile } from "../../../../../protocols-modules-management/nostr/create-nostr-profile.mjs";
import { error, linkHandler, success } from "@oph/ipc/channels/main-window/protocols-modules/nostr-management/channels/create-nostr-profile.js";

export async function configureCreateNostrProfile() {

    linkHandler(ipcMain, (dataForNostrProfileCreation) => {

        return new Promise<ChannelResponse>((resolve) => {

            createNostrProfile(dataForNostrProfileCreation).then((result) => {

                if (result.success) {

                    resolve(success(result.nostrProfileInitializationFilePath))

                } else {

                    switch (result.error) {

                        case "ERROR_TO_CREATE_NOSTR_PROFILE_INITIALIZATION_FILE": resolve(error('ERROR_DURING_PROFILE_CREATION'))
                            break
                            
                        case "UNKNOWN_ERROR": resolve(error('ERROR_DURING_PROFILE_CREATION'))
                            break

                        default: resolve(error('ERROR_DURING_PROFILE_CREATION'))
                    }
                }
            })
        })
    })
}