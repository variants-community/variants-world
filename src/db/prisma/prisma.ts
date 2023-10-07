import { withAccelerate } from '@prisma/extension-accelerate'
const def = await (import.meta.env.PROD ? import('@prisma/client/edge') : import('@prisma/client'))

const prisma = new def.PrismaClient().$extends(withAccelerate())

export default def.Prisma
export { prisma }
