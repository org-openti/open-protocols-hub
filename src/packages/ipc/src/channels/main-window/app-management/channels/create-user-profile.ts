import type { ResultType } from "@oph/types/dev/result-type.js";
import type { UserForRegistrationType } from "@oph/types/app/user/user-for-registration.js";
import { ResultError } from "@oph/types/dev/result-type.js";
import type { IpcHandleFunctionStructureType } from "../../../../util/ipc-handle-functions-structure.js";

export type CreateUserProfileResultErrorTypes = 'Unknown'

export type ProfileCreationProgressType = {

    createdInitFilePath: string | false,
}

export class CreateUserProfileResultError extends ResultError<CreateUserProfileResultErrorTypes> {

    
    profileCreationProgress: ProfileCreationProgressType

    constructor(resultErrorType: CreateUserProfileResultErrorTypes, profileCreationProgress: ProfileCreationProgressType, message?: string) {

        super(resultErrorType, undefined, message)

        this.profileCreationProgress = profileCreationProgress
    }
}

export type CreateUserProfileFunctionComponentsType = IpcHandleFunctionStructureType<UserForRegistrationType, ResultType<ProfileCreationProgressType, CreateUserProfileResultError>>