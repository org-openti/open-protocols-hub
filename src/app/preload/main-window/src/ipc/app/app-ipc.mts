import type { AppIpcHandleFunctionsMapping } from '@oph/ipc/channels/main-window/app-management/app-management.js'

import { ipcRenderer } from 'electron'

export function appIpcInvoke<Key extends keyof AppIpcHandleFunctionsMapping>(

    channel: Key,
    args: AppIpcHandleFunctionsMapping[Key]['params']
    
): AppIpcHandleFunctionsMapping[Key]['returnValue'] {

    return ipcRenderer.invoke(channel, args)
}