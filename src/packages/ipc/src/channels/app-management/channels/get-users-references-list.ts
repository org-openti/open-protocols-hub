import type { UserReferenceType } from "@oph/types/app/user-reference.js";
import { ResultError, type ResultType } from "@oph/types/dev/result-type.js";
import type { IpcHandleFunctionStructureType } from "../../../util/ipc-handle-functions-structure.js";

export const GetUsersReferencesListResultErrorTypes = {

    UNKNOWN: 'Unknown',

} as const;

export type GetUsersReferencesListResultErrorTypes = typeof GetUsersReferencesListResultErrorTypes[keyof typeof GetUsersReferencesListResultErrorTypes];

export class GetUsersReferencesListResultError extends ResultError<GetUsersReferencesListResultErrorTypes> { }

export type GetUsersReferencesListFunctionComponentsType = IpcHandleFunctionStructureType<void, ResultType<UserReferenceType[], GetUsersReferencesListResultError>>