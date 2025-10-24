export type UserForRegistrationType = {

    userName: string,
    password: string | null,

    initFileDirPath: string | null,
    personalizedInitFileName: string | null

    addUserReference: boolean
}