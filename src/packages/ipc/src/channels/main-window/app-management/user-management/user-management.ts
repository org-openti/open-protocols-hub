import type { ExposedFunction as getNostrUserProfilesReferences } from "./channels/get-nostr-profiles-list.js"
import type { ExposedFunction as getTheDefaultUserDirectoryOfNostrProfiles } from "./channels/get-the-default-user-directory-of-nostr-profiles.js"
import type { ExposedFunction as getUserPublicProfile } from "./channels/request-public-user-profile-data.js"
import type { ExposedFunction as loadUserProfile } from "./channels/load-user-profile.js"
import type { ExposedFunction as logoutUser } from "./channels/logout-user.js"
import type { ExposedFunction as setIsUserLoggedUpdatedValueChangeListener } from "./channels/user-session-state.js"
import type { ExposedFunction as setUserPublicProdileDataChangeListener } from "./channels/send-public-user-profile-data.js"

export type UserManagement = {

    getNostrUserProfilesReferences: getNostrUserProfilesReferences
    getTheDefaultUserDirectoryOfNostrProfiles: getTheDefaultUserDirectoryOfNostrProfiles
    getUserPublicProfile: getUserPublicProfile
    loadUserProfile: loadUserProfile
    logoutUser: logoutUser
    setIsUserLoggedUpdatedValueChangeListener: setIsUserLoggedUpdatedValueChangeListener
    setUserPublicProdileDataChangeListener: setUserPublicProdileDataChangeListener
}