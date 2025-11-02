import type { BrowserWindow } from "electron"
import z from "zod";

const CHANNEL_NAME = 'user-session-state'

const StateSchema = z.enum(["LOGGED_IN", "LOGGED_OUT"])

export type State = z.infer<typeof StateSchema>;

export const StateEnum = StateSchema.enum

export type ExposedFunction = (listener: (isUserLoggedChange: State) => void) => void

export function configureMainSideChannel(

    browserWindow: BrowserWindow,
    dataUpdater: (listener: (isUserLoggedChange: State) => void) => void

) {

    dataUpdater((isUserLoggedChange) => {

        browserWindow.webContents.send(CHANNEL_NAME, isUserLoggedChange)
    })
}

export function configureRendererSideChannel(

    ipcRenderer: Electron.IpcRenderer,
    listener: (isUserLoggedChange: State) => void

) {

    ipcRenderer.on(CHANNEL_NAME, (_, value) => {

        const parse = StateSchema.safeParse(value)

        if(parse.success){

            listener(parse.data)
        }
    })
}