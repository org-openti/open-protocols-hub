import { BrowserWindow, ipcMain } from "electron";
import { configureUserSessionStateChannel } from "./channels/is-user-logged-value-updated.mjs";
import { configureSendPublicUserProfileDataChannel } from "./channels/send-public-user-profile-data.mjs";
import { configureChannelLogoutUser } from "./channels/logout-user.mjs";
import { configureGetNostrProfilesReferencesList } from "./channels/get-nostr-profiles-references-list.mjs";
import { configureRequestPublicUserProfileDataChannel } from "./channels/request-public-user-profile-data.mjs";

export function configureUserChannels(browseWindow: BrowserWindow) {

    configureUserSessionStateChannel(browseWindow)
    configureChannelLogoutUser()
    configureGetNostrProfilesReferencesList()
    configureSendPublicUserProfileDataChannel(browseWindow)
    configureRequestPublicUserProfileDataChannel()
}