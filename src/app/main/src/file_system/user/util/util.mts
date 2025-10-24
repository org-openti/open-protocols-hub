export const UserDirState = {

    OK: 'Ok.',
    EMPTY: 'Empty.',
    INIT_FILE_NOT_FOUND: 'Init file not found.'
}

export type UserDirState = typeof UserDirState[keyof typeof UserDirState]

export async function isAUserDirectory(userDirPath: string): Promise<UserDirState>{

    
    return UserDirState.INIT_FILE_NOT_FOUND
}