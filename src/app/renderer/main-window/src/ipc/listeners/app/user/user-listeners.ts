import { configureIsUserLoggedUpdatedValueChangeListener } from "./channels/is-user-logged-updated-value";
import { configurePublicUserProfileDataChangeListener } from "./channels/public-user-profile-data-change-listener";

export function configureUserChannelsListeners(){

    configurePublicUserProfileDataChangeListener()
    configureIsUserLoggedUpdatedValueChangeListener()
}