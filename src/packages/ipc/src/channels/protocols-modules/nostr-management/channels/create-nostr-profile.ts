import type { DataForNostrProfileCreation } from "@oph/types/protocols-modules/nostr/data-for-nostr-profile-creation.js";
import {DataForNostrProfileCreationSchema } from "@oph/types/protocols-modules/nostr/data-for-nostr-profile-creation.js";

import { z } from "zod"

import type {IpcMain} from 'electron'

const IPC_CHANNEL_UUID = '6965f118-e42c-434d-b7d9-bc3a92b9d0dc'

const CreateNostrProfileResultErrorsSchema = z.enum([
    'INVALID_INVOKE_RESULT',
    'INVALID_HANDLE_ARGS',
    'ERROR_DURING_PROFILE_CREATION'
])

export type CreateNostrProfileIpcChannelResultErrors = z.infer<typeof CreateNostrProfileResultErrorsSchema>

export const ChannelResponseSchema = z.discriminatedUnion("success", [
    z.object({
        success: z.literal(true),
        nostrProfileInitFilhePath: z.string(),
    }),
    z.object({
        success: z.literal(false),
        error: CreateNostrProfileResultErrorsSchema,
    }),
])

export type ChannelResponse = z.infer<typeof ChannelResponseSchema>

export function success(nostrProfileInitFilhePath: string): ChannelResponse {

    return { success: true, nostrProfileInitFilhePath: nostrProfileInitFilhePath }
}

export function error(error: CreateNostrProfileIpcChannelResultErrors): ChannelResponse {

    return { success: false, error: error }
}

export type ExposedFunction = (dataForNostrProfileCreation: DataForNostrProfileCreation) => Promise<ChannelResponse>

export function linkHandler(

    ipcMain: IpcMain,
    handler: (dataForNostrProfileCreation: DataForNostrProfileCreation) => Promise<ChannelResponse>

) {

    ipcMain.handle(IPC_CHANNEL_UUID, (_, args) => {

        return new Promise<ChannelResponse>((resolve) => {

            const result = DataForNostrProfileCreationSchema.safeParse(args)

            if (result.success) {

                resolve(handler(result.data))

            } else {

                resolve(error('INVALID_HANDLE_ARGS'))
            }
        })
    })
}

export function handleRendererInvoke(

    ipcRenderer: Electron.IpcRenderer,
    args: DataForNostrProfileCreation

): Promise<ChannelResponse> {

    return new Promise<ChannelResponse>((resolve) => {

        ipcRenderer.invoke(IPC_CHANNEL_UUID, args).then((value) => {

            const parse = ChannelResponseSchema.safeParse(value)

            if (parse.success) {

                resolve(parse.data)

            } else {

                return error('INVALID_INVOKE_RESULT')
            }
        })
    })
}