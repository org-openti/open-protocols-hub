import { BrowserWindow } from "electron";
import { configureMainSideChannel, StateEnum, type State } from "@oph/ipc/channels/app-management/user-management/channels/user-session-state.js";
import { addUserSessionChangeListener, isUserLogged } from "../../../../user-session/user-session.mjs";

export function configureUserSessionStateChannel(browseWindow: BrowserWindow) {

    configureMainSideChannel(browseWindow, (listener) => {

        addUserSessionChangeListener((session) => {

            if (session) {

                listener(StateEnum.LOGGED_IN)

            } else {

                listener(StateEnum.LOGGED_OUT)
            }
        })

        if (isUserLogged()) {

            listener(StateEnum.LOGGED_IN)

        } else {

            listener(StateEnum.LOGGED_OUT)
        }
    })
}