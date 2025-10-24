import { contextBridge } from 'electron'
import { ipc } from './ipc/ipc.mjs'

contextBridge.exposeInMainWorld('ipc', ipc)