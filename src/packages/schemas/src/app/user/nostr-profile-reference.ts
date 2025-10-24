import z from 'zod'

export const NostrProfileReferenceSchema = z.object({

    nostrInitFilePath: z.string(),
    publicIdentifier: z.string()
})

export type NostrProfileReference = z.infer<typeof NostrProfileReferenceSchema>