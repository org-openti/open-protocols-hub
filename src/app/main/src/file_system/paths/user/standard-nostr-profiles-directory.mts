import type { SimpleResult } from "@oph/types/dev/simple-result.js";

import path from 'path'
import { resultSucess, resultError } from "@oph/types/dev/simple-result.js";
import { getUserSession } from "../../../user-session/user-session.mjs";

type ResultErrors = 'user-not-logged'

export function getStandardNostrProfilesDirectory(): SimpleResult<string, ResultErrors> {

    const userSession = getUserSession()

    if (userSession) {

        if(userSession.paths.standardNostrProfilesDirectory){

            return resultSucess(userSession.paths.standardNostrProfilesDirectory)
        
        } else {

            return resultSucess(path.join(userSession.paths.userDirPath, '/nostr-profiles'))
        }


    } else {

        return resultError('user-not-logged')
    }
}