import z from "zod"

const CHANNEL_NAME = 'load-user-profile'

const ArgsSchema = z.string();
const ResultSchema = z.enum(["SUCCESS", "INTERNAL_ERROR", "INVALID_PASSWORD"]);

export type Args = z.infer<typeof ArgsSchema>;
type Result = z.infer<typeof ResultSchema>;

export const ResultEnum = ResultSchema.enum

export type ExposedFunction = (userProfileInitFilePath: Args) => Promise<Result>

export function configureMainSideChannel(

    ipcMain: Electron.IpcMain,
    handlerFunction: (initFilePath: Args) => Promise<Result>

) {
    
    ipcMain.handle(CHANNEL_NAME, async (_, args) => {

        const parse = ArgsSchema.safeParse(args)

        if(parse.success){

            return handlerFunction(parse.data)
        
        } else {

            return ResultEnum.INTERNAL_ERROR
        }
    })
}

export function configureRendererSideChannel(

    ipcRenderer: Electron.IpcRenderer,
    userProfileInitFilePath: Args

): Promise<Result> {

    return new Promise<Result>((resolve) => {
        
        ipcRenderer.invoke(CHANNEL_NAME, userProfileInitFilePath).then((value) => {

            const parse = ResultSchema.safeParse(value)

            if(parse.success){

                resolve(parse.data)

            } else {

                resolve(ResultEnum.INTERNAL_ERROR)
            }
        })
    })
}