import { Prisma, PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient()

type ModelNames = Prisma.ModelName

export type Entities = {
    [M in ModelNames]: Exclude<Awaited<ReturnType<PrismaClient[Uncapitalize<M>]["findUnique"]>>, null>
}
