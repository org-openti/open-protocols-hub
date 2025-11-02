import { BrowserWindow, ipcMain } from "electron";
import { loadUser } from "../../../../../app-management/user/user-management.mjs";
import { configureMainSideChannel, ResultEnum } from "@oph/ipc/channels/main-window/app-management/user-management/channels/load-user-profile.js";
import { getAuthenticationWindowInstance } from "../../../../../windows/authentication/authentication-window.mjs";

export function configureLoadUserProfileChannel() {

    configureMainSideChannel(ipcMain, async (initFilePath) => {

        let sucess = await loadUser(initFilePath)

        if (sucess) {

            return 'SUCCESS'

        } else {

            const authenticationWindow = await getAuthenticationWindowInstance('get')

            authenticationWindow.addResultListener((result) => {

                switch (result.status) {

                    case "confirmed": { result.data }
                    case "canceled": return 'OPERATION_CANCELED'
                }
            })

            authenticationWindow.show()

            sucess = await loadUser(initFilePath, '123456')

            if (sucess) {

                return 'SUCCESS'

            } else {

                return 'UNKNOWN_ERROR'
            }
        }
    })
}