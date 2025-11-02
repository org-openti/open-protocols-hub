import { contextBridge } from 'electron'
import { mainWindowIPC } from './ipc/ipc.mjs'

contextBridge.exposeInMainWorld('mainWindowIPC', mainWindowIPC)