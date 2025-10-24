import type { ResultType } from "@oph/types/dev/result-type.js";
import { ResultError } from "@oph/types/dev/result-type.js";
import { stat, mkdir } from 'fs/promises';
import { Stats } from 'fs';
import { resolve } from 'path';
import { exists } from "./file-fs.mjs";

//{----------------
export const CheckIfDirectoryExistsErrorsTypes = {

    DIRECTORY_DOES_NOT_EXIST: 'Directory does not exist.',
    EXIST_BUT_IS_NOT_A_DIRECTORY: 'Exist but is not a directory.',
    UNEXPECTED_ERROR: 'Unexpected error.'
}

export type CheckIfDirectoryExistsErrorsTypes = typeof CheckIfDirectoryExistsErrorsTypes[keyof typeof CheckIfDirectoryExistsErrorsTypes]

class CheckIfDirectoryExistsError extends ResultError<CheckIfDirectoryExistsErrorsTypes> { }

export async function checkIfDirectoryExists(dirPath: string): Promise<ResultType<true, CheckIfDirectoryExistsError>> {

    try {

        const stats: Stats = await stat(dirPath);

        if (stats.isDirectory()) {

            return {
                ok: true,
                value: true
            }

        } else {

            return {
                ok: false,
                error: new CheckIfDirectoryExistsError(CheckIfDirectoryExistsErrorsTypes.EXIST_BUT_IS_NOT_A_DIRECTORY)
            }
        }

    } catch (err: any) {

        if (err.code === 'ENOENT') {

            return {
                ok: false,
                error: new CheckIfDirectoryExistsError(CheckIfDirectoryExistsErrorsTypes.DIRECTORY_DOES_NOT_EXIST, err)
            }
        }

        return {
            ok: false,
            error: new CheckIfDirectoryExistsError(CheckIfDirectoryExistsErrorsTypes.UNEXPECTED_ERROR, err)
        }
    }
}
//----------------}

/**
 * Creates a directory and any necessary parent directories.
 * @param targetPath The target directory path (absolute or relative).
 */
export async function createDirectory(targetPath: string): Promise<boolean> {

    const resolvedPath = resolve(targetPath);

    try {

        await mkdir(resolvedPath, { recursive: true });

        return exists(targetPath)

    } catch (error) {

        console.error(`Failed to create directory: ${(error as Error).message}`);
    }

    return false
}