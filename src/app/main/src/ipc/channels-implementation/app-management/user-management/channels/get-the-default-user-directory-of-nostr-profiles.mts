import { ipcMain } from "electron"
import { getStandardNostrProfilesDirectory } from "../../../../../file_system/paths/user/standard-nostr-profiles-directory.mjs"
import { error, safeHandle, success } from "@oph/ipc/channels/app-management/user-management/channels/get-the-default-user-directory-of-nostr-profiles.js"

export function registerGetTheDefaultUserDirectoryOfNostrProfilesChannelHandle() {

    safeHandle(ipcMain, () => {

        return new Promise((resolve) => {

            const result = getStandardNostrProfilesDirectory()

            if (result.success) {

                resolve(success(result.data))

            } else {

                switch (result.error) {

                    case "user-not-logged": resolve(error('USER_NOT_LOGGED'))
                        break

                    default: resolve(error('UNKNOWN'))
                }
            }
        })
    })
}