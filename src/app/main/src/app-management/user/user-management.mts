import type { UserForRegistrationType } from '@oph/types/app/user/user-for-registration.js';
import type { ResultType } from '@oph/types/dev/result-type.js';
import type { ProfileCreationProgressType } from '@oph/ipc/channels/app-management/channels/create-user-profile.js';

import { ResultError, resultFail, resultValue } from '@oph/types/dev/result-type.js';
import { v4 as uuidv4 } from 'uuid';
import { checkIfFileExists } from "../../file_system/util/file-fs.mjs";
import { getStandardUsersDirectoryPath } from "../../file_system/app/app-data/app-data-fs-management.mjs";
import { addUserReference } from "../../file_system/app/app-data/users-references/users-references-fs-management.js";
import path from "path";
import { finishUserSession, initUserSession } from "../../user-session/user-session.mjs";
import { readUserInitFile, setInitFile, USER_INIT_FILE_NAME } from "../../file_system/user/initialization-file/user-profile-initialization-file-management.mjs";

//{---------------
export type CreateUserProfileResultErrorTypes =
    'An file already exists in the destination path.' |
    'Unknown error.'

export async function createUserProfile(userProfileForRegistration: UserForRegistrationType): Promise<ResultType<ProfileCreationProgressType, ResultError<CreateUserProfileResultErrorTypes>>> {

    const profileCreationProgressType: ProfileCreationProgressType = { createdInitFilePath: false }

    let userInitFileName: string | null = null

    if (userProfileForRegistration.personalizedInitFileName) {

        userInitFileName = userProfileForRegistration.personalizedInitFileName

    } else {

        userInitFileName = USER_INIT_FILE_NAME
    }

    let userInitFilePath: string | null = null

    if (userProfileForRegistration.initFileDirPath) {

        userInitFilePath = userProfileForRegistration.initFileDirPath

    } else {

        userInitFilePath = path.join(getStandardUsersDirectoryPath(), uuidv4())
    }

    const fullFilePath: string = path.join(userInitFilePath, userInitFileName)

    const fileCheckResult = await checkIfFileExists(fullFilePath)

    if (fileCheckResult.ok) {

        if (fileCheckResult.value) {

            return resultFail(new ResultError<CreateUserProfileResultErrorTypes>('An file already exists in the destination path.'))

        } else {

            const result = await setInitFile(
                {
                    standardNostrProfilesDirectory: null,
                    userDirPath: userInitFilePath,
                    userName: userProfileForRegistration.userName,
                    nostrProfilesInitFilePaths: [{
                        initFilePath: '',
                        publicIdentifier: 'Nostr Test'
                    }]
                },
                fullFilePath,
                userProfileForRegistration.password)

            if (result.ok) {

                profileCreationProgressType.createdInitFilePath = fullFilePath

                if (userProfileForRegistration.addUserReference && result.value) {

                    addUserReference({ publicIdentifier: userProfileForRegistration.userName, userInitFilePath: fullFilePath })
                }

            } else {

                switch (result.error.resultErrorType) {

                    case 'Unknown error.': {

                        return resultFail(new ResultError<CreateUserProfileResultErrorTypes>('Unknown error.', result.error.resultErrorType))
                    }
                }
            }
        }
    }

    return resultValue(profileCreationProgressType)
}
//---------------}

export async function loadUser(userDirectory: string, password?: string): Promise<boolean> {

    const readUserInitFileResult = await readUserInitFile(userDirectory, '123456')

    if (readUserInitFileResult.ok) {

        const userSessionInitializationData = readUserInitFileResult.value

        initUserSession(userSessionInitializationData)

        return true

    } else {

        finishUserSession()

        return false
    }
}

export function logoutUser() {

    finishUserSession()
}