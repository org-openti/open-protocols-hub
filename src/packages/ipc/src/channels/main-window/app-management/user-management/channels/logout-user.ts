const CHANEL_NAME = 'logout-user'

export type ExposedFunction = () => void

export function configureIpcMainTypesafe(

    browserWindow: Electron.IpcMain,
    listener: () => void

) {
    console.log('2')

    browserWindow.on(CHANEL_NAME, listener)
}

export function configureIpcRendererTypesafe(

    ipcRenderer: Electron.IpcRenderer,

) {

    console.log('1')

    ipcRenderer.send(CHANEL_NAME)
}