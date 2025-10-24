import { getUsersReferencesList } from "../../file_system/app/app-data/users-references/users-references-fs-management.js";
import { resultValue } from "@oph/types/dev/result-type.js";
import { BrowserWindow } from "electron";
import { createUserProfile, loadUser } from "../../app-management/user/user-management.mjs";
import { AppTypesafeIpcHandler } from "@oph/ipc/channels/app-management/app-management.js";
import { configureUserChannels } from "./user/user-channels.mjs";

export function configureAppChannels(browserWindow: BrowserWindow) {

    AppTypesafeIpcHandler('create-user-profile', (args) => {

        return new Promise((resolve) => {

            createUserProfile(args).then((result) => {

                if (result.ok) {

                    resolve(resultValue(result.value))
                }
            })
        })
    })

    AppTypesafeIpcHandler('get-users-references-list', () => {

        return new Promise((resolve) => {

            getUsersReferencesList().then((value) => {

                resolve(resultValue(value))
            })
        })
    })

    configureUserChannels(browserWindow)
}