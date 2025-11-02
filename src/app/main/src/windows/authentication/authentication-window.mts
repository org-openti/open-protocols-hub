import { app, BrowserWindow } from "electron"
import path, { join } from "path"

type AuthenticationWindow = {

    show: () => void,
    addResultListener: (listener: (result: AuthenticationResult) => void) => void
}

type AuthenticationMode = 'get' | 'new'

export type AuthenticationResult =
    {
        status: 'confirmed',
        data: 'password'
    } | {
        status: 'canceled'
    }

const PRELOAD_PATH = app.isPackaged
    ? join(app.getAppPath(), 'preload/authentication-window/preload.mjs')
    : join(app.getAppPath(), '../preload/authentication-window/dist/preload.mjs')

export function getAuthenticationWindowInstance(mode: AuthenticationMode): Promise<AuthenticationWindow> {
    
    let resultListener: ((result: AuthenticationResult) => void) | null = null

    function addResultListener(listener: (result: AuthenticationResult) => void) {

        resultListener = listener
    }

    return new Promise<AuthenticationWindow>((resolve) => {

        app.whenReady().then(() => {

            const authenticationWindow = new BrowserWindow({
                width: 400,
                height: 250,
                show: false,
                backgroundColor: '#2e2c29',
                webPreferences: {
                    preload: PRELOAD_PATH,
                    contextIsolation: true,
                    sandbox: false,
                },
            })

            if (app.isPackaged) {

                authenticationWindow.loadFile(path.join(app.getAppPath(), '/renderer/authentication-window/index.html'))

            } else {

                authenticationWindow.loadURL('http://localhost:5333/')
                //authenticationWindow.webContents.openDevTools({ mode: 'detach' })
            }

            function show() {

                authenticationWindow.show()
            }

            resolve(
                {
                    addResultListener: addResultListener,
                    show: show
                }
            )
        })
    })
}