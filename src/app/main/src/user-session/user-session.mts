import type { NostrUserProfileReference } from "@oph/types/protocols-modules/nostr/nostr-types.js";
import type { PrivateUserProfileData, PublicUserProfileData } from "@oph/types/app/user/user-profile-data.js";
import type { UserProfileInitializationFile } from "../file_system/user/initialization-file/user-profile-initialization-file-management.mjs";

class UserSession {

    private dataToLoad: UserProfileInitializationFile

    private privateUserProfileData: PrivateUserProfileData
    
    public paths: {
        userDirPath: string,
        standardNostrProfilesDirectory: string | null
    }

    constructor(dataToLoad: UserProfileInitializationFile) {

        this.dataToLoad = dataToLoad

        this.privateUserProfileData = {

            userDirPath: dataToLoad.userDirPath
        }

        this.paths = {
            userDirPath: dataToLoad.userDirPath,
            standardNostrProfilesDirectory: dataToLoad.standardNostrProfilesDirectory
        }
    }

    public getUserPublicData(): PublicUserProfileData {

        return { name: this.dataToLoad.userName }
    }

    public getPrivateUserProfileData(): PrivateUserProfileData {

        return this.privateUserProfileData
    }

}

let userSession: UserSession | null = null

//{---------------- Listeners management
const changeListeners: ((userSession: UserSession | null) => void)[] = []

function nofityListeners() {

    changeListeners.forEach((listener) => {

        listener(userSession)
    })
}
//----------------}

export function initUserSession(dataToLoad: UserProfileInitializationFile) {

    userSession = new UserSession(dataToLoad)

    nofityListeners()
}

export function finishUserSession() {

    if(userSession){

        userSession = null
        
        nofityListeners()
    }
}

export function getUserSession() {

    return userSession
}

export function addUserSessionChangeListener(listener: (userSession: UserSession | null) => void) {

    changeListeners.push(listener)
}

export function isUserLogged() {

    return userSession ? true : false
}

export function getNostrProfilesReferences(): NostrUserProfileReference[] {

    return []
}