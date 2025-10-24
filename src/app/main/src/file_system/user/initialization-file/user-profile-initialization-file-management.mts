import type { ResultType } from '@oph/types/dev/result-type.js';

import { resultFail, ResultError, resultValue } from '@oph/types/dev/result-type.js';
import fs from 'node:fs/promises';
import path from 'node:path';
import { checkIfFileExists } from '../../util/file-fs.mjs';
import crypto from 'crypto'
import { z } from 'zod'

export const USER_INIT_FILE_NAME = 'user-profile-initialization-file.oph'
const SALT_LENGTH = 16; // bytes
const IV_LENGTH = 16;   // bytes
const KEY_LENGTH = 32;  // bytes para AES-256
const PBKDF2_ITERATIONS = 100_000;
const ALGORITHM = 'aes-256-cbc';

const UserProfileInitFileReferenceSchema = z.object({

    publicIdentifier: z.string(),
    initFilePath: z.string(),
})

const UserProfileInitializationFileSchema = z.object({

    userName: z.string(), //User name used in the application.
    userDirPath: z.string(), //Standard directory where user files must be saved.
    standardNostrProfilesDirectory: z.string().nullable(),
    nostrProfilesInitFilePaths: z.array(UserProfileInitFileReferenceSchema).nullable(),
})

export type NostrProfileInitFileReference = z.infer<typeof UserProfileInitFileReferenceSchema>

export type UserProfileInitializationFile = z.infer<typeof UserProfileInitializationFileSchema>

//{----------------

export const ReadUserInitFileErrors = {

    FILE_ENCRYPTED_PASSWORD_REQUIRED: 'File encrypted, password required.',
    FILE_NOT_RECOGNIZED_OR_CORRUPTED: 'File not recognized or corrupted.',
    FILE_TOO_SMALL_TO_BE_VALID: 'File too small to be valid.',
    UNKNOWN_ERROR: 'Unknown error.',
    USER_INIT_FILE_NOT_FOUND: 'User init file not found.'
}

export type ReadUserInitFileErrors = typeof ReadUserInitFileErrors[keyof typeof ReadUserInitFileErrors]

class ReadUserInitFileError extends ResultError<ReadUserInitFileErrors> { }

export async function readUserInitFile(filePath: string, password?: string): Promise<ResultType<UserProfileInitializationFile, ReadUserInitFileError>> {

    const checkResult = await checkIfFileExists(filePath)

    if (checkResult.ok) {

        if (checkResult.value) {

            const fileBuffer = await fs.readFile(filePath);

            let dataBuffer: Buffer<ArrayBufferLike>

            if (fileBuffer.length < 16) {

                return resultFail(new ReadUserInitFileError(ReadUserInitFileErrors.FILE_TOO_SMALL_TO_BE_VALID))

            } else {

                const magic = fileBuffer.subarray(0, 3).toString('ascii');
                const version = fileBuffer.readUInt8(3);
                const flags = fileBuffer.readUInt8(4);
                const originalSize = fileBuffer.readUInt32BE(5);

                if (magic === 'enc') {

                    if (password) {

                        let dataBufferAux = fileBuffer.subarray(16)

                        const salt = dataBufferAux.subarray(0, SALT_LENGTH)

                        const iv = dataBufferAux.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH)

                        const encryptedData = dataBufferAux.subarray(SALT_LENGTH + IV_LENGTH)

                        const key = crypto.pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, KEY_LENGTH, 'sha256')

                        const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)

                        const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()])

                        const parse = UserProfileInitializationFileSchema.safeParse(JSON.parse(decrypted.toString('utf-8')))

                        if (parse.success) {

                            return resultValue(parse.data)
                        }

                    } else {

                        return resultFail(new ReadUserInitFileError(ReadUserInitFileErrors.FILE_ENCRYPTED_PASSWORD_REQUIRED))
                    }

                } else if (magic === 'pln') {

                } else {

                    return resultFail(new ReadUserInitFileError(ReadUserInitFileErrors.FILE_NOT_RECOGNIZED_OR_CORRUPTED))
                }
            }

        } else {

            return resultFail(new ReadUserInitFileError(ReadUserInitFileErrors.USER_INIT_FILE_NOT_FOUND))
        }

    } else {

        return resultFail(new ReadUserInitFileError(ReadUserInitFileErrors.UNKNOWN_ERROR, checkResult.error.resultErrorType))
    }

    return resultFail(new ReadUserInitFileError(ReadUserInitFileErrors.UNKNOWN_ERROR))
}
//----------------}

//{----------------
export type SetInitFileErrors = 'Unknown error.'

export class SetInitFileError extends ResultError<SetInitFileErrors> { }

export async function setInitFile(userInitDataToStorage: UserProfileInitializationFile, fullFilePath: string, password?: string | null): Promise<ResultType<boolean, SetInitFileError>> {

    let dataBuffer: Buffer<ArrayBuffer>

    if (password) {

        const iv = crypto.randomBytes(IV_LENGTH);

        const salt = crypto.randomBytes(SALT_LENGTH);

        const key = crypto.pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, KEY_LENGTH, 'sha256');

        const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

        const encryptedData = Buffer.concat([cipher.update(JSON.stringify(userInitDataToStorage), 'utf8'), cipher.final()]);

        dataBuffer = Buffer.concat([salt, iv, encryptedData]);

    } else {

        dataBuffer = Buffer.from(JSON.stringify(userInitDataToStorage), 'utf-8')
    }

    const headBuffer = Buffer.alloc(16);

    headBuffer.write(password ? 'enc' : 'pln', 0, 3, 'ascii');
    headBuffer.writeUInt8(1, 3); // versão
    headBuffer.writeUInt8(password ? 1 : 0, 4); // flag criptografado
    headBuffer.writeUInt32BE(dataBuffer.length, 5); // tamanho original

    const finalBuffer = Buffer.concat([headBuffer, dataBuffer]);

    try {

        await fs.mkdir(path.dirname(fullFilePath), { recursive: true })

        await fs.writeFile(fullFilePath, finalBuffer)

        return resultValue(true)

    } catch (error) {

        return resultFail(new SetInitFileError('Unknown error.'))
    }
}
//----------------}
