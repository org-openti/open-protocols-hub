import type { UserManagement } from "@oph/ipc/channels/main-window/app-management/user-management/user-management.js";

import { logoutUser } from "../../../app/user/logout-user.mjs";
import { setIsUserLoggedChangeListener } from "../../../app/user/send-is-user-logged-value.mjs";
import { setPublicUserProfileDataChangeListener } from "../../../app/user/send-public-user-profile-data.mjs";
import { getUserProfileData } from "../../../app/user/user-functions.mjs";
import { getNostrUserProfilesReferencesFunctionImplementation } from "./channels/get-nostr-profiles-list.mjs";
import { safeGetTheDefaultUserDirectoryOfNostrProfiles } from "./channels/get-the-default-user-directory-of-nostr-profiles.mjs";
import { loadUserProfileFunctionImplementation } from "./channels/load-user-profile.mjs";

export const userManagement: UserManagement = {
    
    getUserPublicProfile: getUserProfileData,
    setUserPublicProdileDataChangeListener: setPublicUserProfileDataChangeListener,
    setIsUserLoggedUpdatedValueChangeListener: setIsUserLoggedChangeListener,
    logoutUser: logoutUser,
    getNostrUserProfilesReferences: getNostrUserProfilesReferencesFunctionImplementation,
    loadUserProfile: loadUserProfileFunctionImplementation,
    getTheDefaultUserDirectoryOfNostrProfiles: safeGetTheDefaultUserDirectoryOfNostrProfiles
}