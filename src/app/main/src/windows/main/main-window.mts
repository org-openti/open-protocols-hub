import path, { join } from "path"
import { configureIPC } from "../../ipc/ipc-manager.mjs"
import { app, BrowserWindow } from "electron"

type MainWindow = {

    show: () => void
}

const PRELOAD_PATH = app.isPackaged
    ? join(app.getAppPath(), 'preload/main-window/preload.mjs')
    : join(app.getAppPath(), '../preload/main-window/dist/preload.mjs')

export function getMainWindowInstance(): Promise<MainWindow> {

    return new Promise<MainWindow>((resolve) => {

        app.on('ready', () => {

            const browserWindow = new BrowserWindow({

                width: 1024,
                height: 768,
                webPreferences: {

                    preload: PRELOAD_PATH,
                    contextIsolation: true,
                    sandbox: false,
                }
            })

            if (app.isPackaged) {

                browserWindow.loadFile(path.join(app.getAppPath(), '/renderer/main-window/index.html'))

            } else {

                browserWindow.loadURL('http://localhost:5666/')
                browserWindow.webContents.openDevTools({ mode: 'detach' })
            }

            configureIPC(browserWindow)

            resolve({

                show: () => {

                    browserWindow.once('ready-to-show', () => {
                        
                        browserWindow.show()
                    })
                }
            })
        })
    })
}