import type { AppIpcHandleFunctionsMapping } from '@oph/ipc/channels/app-management/app-management.js'
import type { IPC } from '@oph/ipc/ipc.js'

import { appIpcInvoke } from './app/app-ipc.mjs'
import { protocolsModules } from './channels-implementation/protocols-modules/protocols-modules.js'
import { userManagement } from './channels-implementation/app-management/user-management/user-management.mjs'

export const ipc: IPC = {

    appManagement: {

        userManagement: userManagement,

        createUserProfile: (args: AppIpcHandleFunctionsMapping['create-user-profile']['params']) => appIpcInvoke('create-user-profile', args),
        getUsersReferencesList: (args: AppIpcHandleFunctionsMapping['get-users-references-list']['params']) => appIpcInvoke('get-users-references-list', args),
    },

    protocolsModules: protocolsModules
}