import { ipcMain } from "electron";
import { loadUser } from "../../../../../app-management/user/user-management.mjs";
import { configureMainSideChannel, ResultEnum } from "@oph/ipc/channels/app-management/user-management/channels/load-user-profile.js";

export function configureLoadUserProfileChannel() {

    configureMainSideChannel(ipcMain, async (initFilePath) => {

        const result = await loadUser(initFilePath)

        if(result){

            return ResultEnum.SUCCESS
            
        } else {

            return ResultEnum.INTERNAL_ERROR
        }
    })
}