import { ipcMain } from "electron";
import { configureIpcMainTypesafe } from "@oph/ipc/channels/app-management/user-management/channels/logout-user.js";
import { logoutUser } from "../../../../app-management/user/user-management.mjs";

export function configureChannelLogoutUser() {
    
    configureIpcMainTypesafe(ipcMain, logoutUser)
}