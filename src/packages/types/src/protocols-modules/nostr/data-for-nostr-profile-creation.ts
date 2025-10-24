import { z } from "zod"

export const DataForNostrProfileCreationSchema = z.object({

    nostrSecKey: z.string().nullable(),
    nostrPubKey: z.string(),
    nostrProfileDir: z.string(),
    saveReference: z.boolean(),
    encrytationPassword: z.string().nullable()
})

export type DataForNostrProfileCreation = z.infer<typeof DataForNostrProfileCreationSchema>