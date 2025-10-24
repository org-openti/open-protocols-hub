import { userPublicProfileDataUpdaterListener } from "../../../../../app_state/stores/app/user/user-public-profile-data-store";
import ipc from "../../../ipc-client";

export function configurePublicUserProfileDataChangeListener() {

    ipc.appManagement.userManagement.setUserPublicProdileDataChangeListener(userPublicProfileDataUpdaterListener)
}