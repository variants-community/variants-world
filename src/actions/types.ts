import { z } from 'astro/zod'

export const createPostPayloadSchema = z.object({
  userId: z.number(),
  gameNr: z.string(),
  confirmingGameNrs: z.array(z.string()),
  title: z.string(),
  description: z.string(),
  type: z.enum(['NCV', 'WOF'])
})

export type CreatePostDetails = z.infer<typeof createPostPayloadSchema>

export const validateGamesPayloadSchema = z.object({
  mainGameNr: z.string(),
  confirmingGameNrs: z.array(z.string())
})

export type ValidateGamesPayload = z.infer<typeof validateGamesPayloadSchema>
