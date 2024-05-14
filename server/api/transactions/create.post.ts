import { z } from 'zod'
import { PublicKey } from '@solana/web3.js'

const schema = z.object({
  recipient: z.string(),
  amount: z.number(),
  label: z.string(),
  memo: z.string().optional(),
  message: z.string().optional(),
  splToken: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const validation = await readValidatedBody(event, schema.safeParse)

  if (!validation.success) {
    throw createError({
      statusCode: 422,
      message: 'Invalid request body',
      data: { errors: validation.error.errors },
    })
  }

  const recipient = new PublicKey(validation.data.recipient)
})
