import type { NostrProfileReference } from "@oph/schemas/app/user/nostr-profile-reference.js";
import type { IpcMain, IpcRenderer } from 'electron'

import { NostrProfileReferenceSchema } from "@oph/schemas/app/user/nostr-profile-reference.js";
import z from "zod";

const IPC_CHANNEL_UUID = '059a4e52-ba81-4dab-8ea6-423aee862d91'

const GetNostrProfilesReferencesListResultErrorsSchema = z.enum([
    'ERROR_X',
    'ERROR_Y',
    'ERROR_Z'
])

export type GetNostrProfilesReferencesListResultErrors = z.infer<typeof GetNostrProfilesReferencesListResultErrorsSchema>

export const ChannelResponseSchema = z.discriminatedUnion("success", [
    z.object({
        success: z.literal(true),
        resultData: NostrProfileReferenceSchema
    }),
    z.object({
        success: z.literal(false),
        error: GetNostrProfilesReferencesListResultErrorsSchema
    }),
])

export type ChannelResponse = z.infer<typeof ChannelResponseSchema>

export type ExposedFunction = () => Promise<ChannelResponse>

export function linkMainSide(

    ipcMain: IpcMain,
    dataProvider: () => NostrProfileReference[] | null

) {

    ipcMain.handle(IPC_CHANNEL_UUID, async () => {

        return dataProvider()
    })
}

export function linkRendererSide(

    ipcRenderer: IpcRenderer

): Promise<ChannelResponse> {

    return ipcRenderer.invoke(IPC_CHANNEL_UUID)
}