import { withAccelerate } from '@prisma/extension-accelerate'

const def = await (import.meta.env.VW_ENV === 'prod' ? import('prisma/generated/deno') : import('@prisma/client'))
const prisma = new def.PrismaClient().$extends(withAccelerate())

export default def.Prisma
export { prisma }
