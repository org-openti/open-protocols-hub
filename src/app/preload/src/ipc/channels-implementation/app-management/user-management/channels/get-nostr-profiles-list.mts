import { ipcRenderer } from "electron";
import { linkRendererSide } from "@oph/ipc/channels/app-management/user-management/channels/get-nostr-profiles-list.js";

export function getNostrUserProfilesReferencesFunctionImplementation() {

    return linkRendererSide(ipcRenderer)
}