import { BrowserWindow } from "electron";
import { configureAppChannels } from "./app/app-ipc-manager.mjs";
import { configureNostrManagementChannels } from "./channels-implementation/protocols-modules/nostr-management/nostr-management.mjs";
import { configureAppManagementChannels } from "./channels-implementation/app-management/app-management.mjs";

export function configureIPC(browserWindow: BrowserWindow){

    //FIXME - Delete the implementation of this channels
    configureAppChannels(browserWindow)

    configureAppManagementChannels()
    configureNostrManagementChannels()
}