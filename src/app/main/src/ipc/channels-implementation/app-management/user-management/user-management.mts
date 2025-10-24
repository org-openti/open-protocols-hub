import { registerGetTheDefaultUserDirectoryOfNostrProfilesChannelHandle } from "./channels/get-the-default-user-directory-of-nostr-profiles.mjs";
import { configureLoadUserProfileChannel } from "./channels/load-user-profile.mjs";

export function configureUserManagementChannels(){

    configureLoadUserProfileChannel()
    registerGetTheDefaultUserDirectoryOfNostrProfilesChannelHandle()
}