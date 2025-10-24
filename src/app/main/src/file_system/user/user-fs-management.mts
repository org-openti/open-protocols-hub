import path from 'path';
import { exists } from '../util/file-fs.mjs';
import { createDirectory } from '../util/dir-fs.mjs';

/**
 * Create a new user directory and return it's name and absolute path in a array structure [directoryName, directoryPath]
 */
export async function createNewUserDirectoryStructure(userDirRootPath: string): Promise<boolean> {

    try {

        const userDirExists = await exists(userDirRootPath)

        if(userDirExists){

            let wasUserDirStructureCreated: boolean = true

            const wasNostrDirCreate = await createDirectory(path.join(userDirRootPath, 'nostr'))

            if(!wasNostrDirCreate) {

                wasUserDirStructureCreated = false
            }

            return wasUserDirStructureCreated

        } else {

            return false
        }

    } catch (err) {

        throw new Error("Error while creating user directory structure.");
    }
}