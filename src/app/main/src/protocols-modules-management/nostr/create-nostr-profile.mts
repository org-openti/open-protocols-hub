import type { DataForNostrProfileCreation } from "@oph/types/protocols-modules/nostr/data-for-nostr-profile-creation.js"
import { setNostrProfileInitializationFile } from "../../file_system/protocols-modules/nostr/nostr-profile-initialization-file-management.mjs"

export type CreateNostrProfileErrors = 'ERROR_TO_CREATE_NOSTR_PROFILE_INITIALIZATION_FILE' | 'UNKNOWN_ERROR'

type Result =
    | {
        success: true,
        nostrProfileInitializationFilePath: string
    }
    | {

        success: false,
        error: CreateNostrProfileErrors
    }

function success(nostrProfileInitializationFilePath: string): Result {

    return { success: true, nostrProfileInitializationFilePath: nostrProfileInitializationFilePath }
}

function error(error: CreateNostrProfileErrors): Result {

    return { success: false, error: error }
}

export function createNostrProfile(dataForNostrProfileCreation: DataForNostrProfileCreation): Promise<Result> {

    return new Promise<Result>((resolve) => {

        let filePath = dataForNostrProfileCreation.nostrProfileDir

        const nostrProfileInitializationFilePath = `${filePath}/nostr-profile-initialization-file.oph`

        setNostrProfileInitializationFile(

            {
                pubKey: dataForNostrProfileCreation.nostrPubKey,
                secKey: dataForNostrProfileCreation.nostrSecKey
            },
            nostrProfileInitializationFilePath,
            dataForNostrProfileCreation.encrytationPassword

        ).then((value) => {

            switch (value) {

                case "SUCCESS": {

                    if (dataForNostrProfileCreation.saveReference) {

                        //TODO: Implements a whay to save the Nostr profile reference in the user application profile.
                    }

                    resolve(success(nostrProfileInitializationFilePath))
                }
                    break;

                case "FAILURE": resolve(error('ERROR_TO_CREATE_NOSTR_PROFILE_INITIALIZATION_FILE'))
                    break;

                default: resolve(error('UNKNOWN_ERROR'))
            }
        })
    })
}