import z from "zod"
import crypto from 'crypto'
import fs from 'node:fs/promises';
import path from "node:path";

const SALT_LENGTH = 16; // bytes
const IV_LENGTH = 16;   // bytes
const KEY_LENGTH = 32;  // bytes para AES-256
const PBKDF2_ITERATIONS = 100_000;
const ALGORITHM = 'aes-256-cbc';

const NostrProfileInitializationFileSchema = z.object({

    pubKey: z.string(),
    secKey: z.string().nullable()
})

type NostrProfileInitializationFile = z.infer<typeof NostrProfileInitializationFileSchema>

//{ setNostrProfileInitializationFile block
const SetNostrProfileInitializationFileResultSchema = z.enum(['SUCCESS', 'FAILURE'])

type SetNostrProfileInitializationFileResult = z.infer<typeof SetNostrProfileInitializationFileResultSchema>

export const SetNostrProfileInitializationFileResultEnum = SetNostrProfileInitializationFileResultSchema.enum

export async function setNostrProfileInitializationFile(nostrProfileInitFile: NostrProfileInitializationFile, filePath: string, password: string | null): Promise<SetNostrProfileInitializationFileResult> {

    const parse = NostrProfileInitializationFileSchema.safeParse(nostrProfileInitFile)

    if (parse.success) {

        let dataBuffer: Buffer<ArrayBuffer>

        if (password) {

            const iv = crypto.randomBytes(IV_LENGTH);

            const salt = crypto.randomBytes(SALT_LENGTH);

            const key = crypto.pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, KEY_LENGTH, 'sha256');

            const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

            const encryptedData = Buffer.concat([cipher.update(JSON.stringify(parse.data), 'utf8'), cipher.final()]);

            dataBuffer = Buffer.concat([salt, iv, encryptedData]);

        } else {

            dataBuffer = Buffer.from(JSON.stringify(parse.data), 'utf-8')
        }

        const headBuffer = Buffer.alloc(16);

        headBuffer.write(password ? 'enc' : 'pln', 0, 3, 'ascii');
        headBuffer.writeUInt8(1, 3); // versão
        headBuffer.writeUInt8(password ? 1 : 0, 4); // flag criptografado
        headBuffer.writeUInt32BE(dataBuffer.length, 5); // tamanho original

        const finalBuffer = Buffer.concat([headBuffer, dataBuffer]);

        try {

            await fs.mkdir(path.dirname(filePath), { recursive: true })

            await fs.writeFile(filePath, finalBuffer)

            return SetNostrProfileInitializationFileResultEnum.SUCCESS

        } catch (error) {

            return SetNostrProfileInitializationFileResultEnum.FAILURE
        }
    }

    return SetNostrProfileInitializationFileResultEnum.FAILURE
}
//}