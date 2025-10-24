import path from 'path'
import { app } from "electron"

const APP_DATA_DIR_NAME = 'app-data'

export function getAppDataDirPath(): string {

    return path.join(getAppPersistentStorageDirectoryPath(), APP_DATA_DIR_NAME)

}

export function getAppPersistentStorageDirectoryPath(): string {

    const directoryPath =  path.join( app.getPath('home'), ".open-protocols-hub")

    return directoryPath
}

export function getStandardUsersDirectoryPath(): string {

    return path.join(getAppPersistentStorageDirectoryPath(), 'users')
}