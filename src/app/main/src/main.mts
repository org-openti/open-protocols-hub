import { app, BrowserWindow, Menu } from 'electron'
import { isDev } from './util/devUtilities.js'
import { configureIPC } from './ipc/ipc-manager.mjs'
import path, { join } from 'path'

Menu.setApplicationMenu(null)

app.on('ready', () => {

    // OPTIMIZE: Implement a more accurate check to obtain the preload path in the development and production environments, if possible in a specific module for this purpose.
    const preloadPath = app.isPackaged
        ? join(app.getAppPath(), 'preload/preload.mjs')
        : join(app.getAppPath(), '../preload/dist-prod/preload.mjs');

    const mainWindow = new BrowserWindow({

        width: 1024,
        height: 768,

        webPreferences: {

            preload: preloadPath,
            contextIsolation: true,
            sandbox: false,
        }
    })

    mainWindow.webContents.openDevTools({ mode: 'detach' });

    if (isDev()) {

        mainWindow.loadURL('http://localhost:5666/')

    } else {

        mainWindow.loadFile(path.join(app.getAppPath(), '/renderer/main-window/index.html'))
    }

    configureIPC(mainWindow)
})