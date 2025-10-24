import z from "zod"
import type { IpcMain } from 'electron'

const IPC_CHANNEL_UUID = '1dd7eacb-ac23-4710-a7dd-a225bf0b6fa4'

const GetTheDefaultDirectoryOfNostrProfilesResultErrorsSchema = z.enum([
    'INVALID_HANDLER_RESULT',
    'INVALID_INVOKE_RESULT',
    'USER_NOT_LOGGED',
    'UNKNOWN'
])

export type GetTheDefaultDirectoryOfNostrProfilesChannelResultErrors = z.infer<typeof GetTheDefaultDirectoryOfNostrProfilesResultErrorsSchema>

export const ChannelResponseSchema = z.discriminatedUnion("success", [
    z.object({
        success: z.literal(true),
        defaultDirectoryOfNostrProfiles: z.string(),
    }),
    z.object({
        success: z.literal(false),
        error: GetTheDefaultDirectoryOfNostrProfilesResultErrorsSchema,
    }),
])

export function success(defaultDirectoryOfNostrProfiles: string): ChannelResponse {

    return { success: true, defaultDirectoryOfNostrProfiles: defaultDirectoryOfNostrProfiles }
}

export function error(error: GetTheDefaultDirectoryOfNostrProfilesChannelResultErrors): ChannelResponse {

    return { success: false, error: error }
}

export type ChannelResponse = z.infer<typeof ChannelResponseSchema>

export type ExposedFunction = () => Promise<ChannelResponse>

export function safeHandle(

    ipcMain: IpcMain,
    handler: () => Promise<ChannelResponse>

) {

    ipcMain.handle(IPC_CHANNEL_UUID, () => {

        return new Promise<ChannelResponse>((resolve) => {

            handler().then((value) => {

                const parse = ChannelResponseSchema.safeParse(value)

                if (parse.success) {

                    resolve(parse.data)

                } else {

                    resolve(error('INVALID_HANDLER_RESULT'))
                }
            })
        })
    })
}

export function safeInvoke(

    ipcRenderer: Electron.IpcRenderer

): Promise<ChannelResponse> {

    return new Promise<ChannelResponse>((resolve) => {

        ipcRenderer.invoke(IPC_CHANNEL_UUID).then((value) => {

            const parse = ChannelResponseSchema.safeParse(value)

            if (parse.success) {

                resolve(parse.data)

            } else {

                resolve(error('INVALID_INVOKE_RESULT'))
            }
        })
    })
}