import type { PublicUserProfileData } from "@oph/types/app/user/user-profile-data.js";

import { BrowserWindow } from "electron";
import { configureMainSideChannel } from "@oph/ipc/channels/main-window/app-management/user-management/channels/send-public-user-profile-data.js";
import { addUserSessionChangeListener } from "../../../../user-session/user-session.mjs";

export function configureSendPublicUserProfileDataChannel(browseWindow: BrowserWindow) {

    function listenerSubscribe(listener: (publicUserProfileDataChange: PublicUserProfileData | null) => void) {

        addUserSessionChangeListener((userSession) => {

            if(userSession){

                listener(userSession.getUserPublicData())

            } else {
                
                listener(null)
            }
        })
    }
    
    configureMainSideChannel(browseWindow, listenerSubscribe)
}