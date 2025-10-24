# Standardization of IPC Communication Channels

## Step One

In the directory most appropriate for the channel, create a `.ts` file with a very descriptive name of it's function, using kebab-case format.

## Step Two

In the module file, create a constant that stores a string containing a UUID v4, which will act as the unique identifier of the channel.

```typescript
// Example (placeholder UUID, not valid)
const IPC_CHANNEL_UUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
```

## Step X

Create a type of the kind of data the channel will return, preferably using the Zod library to perform data type validation.

Replace "_" in types and constants with the channel name for better identification.

```typescript
//Replace the "_" with the channel name in CamelCase format.
const _ResultErrorsSchema = z.enum([
    'ERROR_X',
    'ERROR_Y',
    'ERROR_Z'
])

//Replace the "_" with the channel name in CamelCase format.
export type _ResultErrors = z.infer<typeof _ResultErrorsSchema>

export const ChannelResponseSchema = z.discriminatedUnion("success", [
    z.object({
        success: z.literal(true),
        resultData: z.any(),
    }),
    z.object({
        success: z.literal(false),
        error: _ResultErrorsSchema,
    }),
])

export type ChannelResponse = z.infer<typeof ChannelResponseSchema>
```

## Step X

Create a type for define the structure of the exposed function in the Renderer through the Preload

```typescript
export type ExposedFunction = (args: any) => Promise<ChannelResponse>
```

## Step X

Implementation of functions to "link" the Renderer and Main in the channel, this implementation can change depending of the type of the communication you choose, next there are example of all the types of channel you can implements.

### ipcRenderer.invoke and ipcMain.handle

In this point you must define two functions for a safe comunication between the ipcRenderer and the ipcMain in the channel.

1. Example of a type safe invoke function

```typescript
export function safeInvoke(

    ipcRenderer: Electron.IpcRenderer,
    args: any

): Promise<ChannelResponse> {

    return new Promise<ChannelResponse>((resolve) => {

        ipcRenderer.invoke(IPC_CHANNEL_UUID, args).then((value) => {

            const parse = ChannelResponseSchema.safeParse(value)

            if (parse.success) {

                resolve(parse.data)

            } else {

                resolve(error(''))
            }
        })
    })
}
```

2. Example of a type safe handle function

```typescript
export async function safeHandle(

    ipcRenderer: Electron.IpcRenderer,
    args: DataForNostrProfileCreation

): Promise<ChannelResponse> {

    const invokeResult = await ipcRenderer.invoke(IPC_CHANNEL_UUID, args)

    const parse = ChannelResponseSchema.safeParse(invokeResult)

    if (parse.success) {

        return (parse.data)

    } else {

        return error('INVALID_INVOKE_RESULT')
    }
}
```

## Step X - Add the exposed function in it's equivalent module in the hierarchy of the ipc.d.ts main module.

## Step X - Exposing the function in the Renderer

In the preload subproject go to the equivalement module file in the hierarchy of the IPC structure and create a function of the same type of `ExposedFunction` with the name with the prefix "safe" with the exposed name of the channel, all in CamelCase.

```typescript
//example
export function safeChannelName: ExposedFunction = (args) => {

    safeInvoke(ipcRenderer, args)
}
```

In the main subproject go to the equivalement module file in the hierarchy of the IPC structure and create a function of the same type of `ExposedFunction` with the name with the prefix "register" with the exposed name of the function and at the and the word ChannelHandle, all in CamelCase.

```typescript
//example
export function ConfigureChannelNameHandle: ExposedFunction = (args) => {

    safeHandle(ipcMain, handleFunction)
}
```