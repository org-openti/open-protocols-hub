import { ipcMain } from "electron";
import { configureMainSideChannel } from "@oph/ipc/channels/app-management/user-management/channels/request-public-user-profile-data.js";
import { getUserSession } from "../../../../user-session/user-session.mjs";

export function configureRequestPublicUserProfileDataChannel() {

    configureMainSideChannel(ipcMain, () => {

        const userSession = getUserSession()

        if(userSession){

            return userSession.getUserPublicData()
        }

        return null
    })
}