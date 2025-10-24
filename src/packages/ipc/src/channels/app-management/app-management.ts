import type { IpcHandleFunctionBaseType, IpcHandleFunctionMappingStructureType } from "../../util/ipc-handle-functions-structure.js";
import { type CreateUserProfileFunctionComponentsType } from "./channels/create-user-profile.js"
import { type GetUsersReferencesListFunctionComponentsType } from "./channels/get-users-references-list.js"
import { ipcMain } from "electron";
import type { UserManagement } from "./user-management/user-management.js";

export type AppManagement = {

    //{ipcMain.handle functions
    createUserProfile: IpcHandleFunctionBaseType<AppIpcHandleFunctionsMapping['create-user-profile']>,
    getUsersReferencesList: IpcHandleFunctionBaseType<AppIpcHandleFunctionsMapping['get-users-references-list']>,
    //}

    userManagement: UserManagement
}

//TODO: I need to implements any whay to validade the args types before call the handler function.
export function AppTypesafeIpcHandler<Key extends keyof AppIpcHandleFunctionsMapping>(

    channel: Key,
    handler: (args: AppIpcHandleFunctionsMapping[Key]['params']) => AppIpcHandleFunctionsMapping[Key]['returnValue']

) {

    ipcMain.handle(channel, (_, args) => {

        //TODO: validateEventFrame(evt.senderFrame)

        return handler(args)
    })
}

export type AppIpcHandleFunctionsMapping = IpcHandleFunctionMappingStructureType<{

    'create-user-profile': CreateUserProfileFunctionComponentsType,
    'get-users-references-list': GetUsersReferencesListFunctionComponentsType,
}>