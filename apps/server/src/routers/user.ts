import { z } from "zod"
import { router, publicProcedure } from "../trpc"
import { prisma } from "../prisma"
import { User } from "@prisma/client"
import { waitUntilPresent } from "../utils"

const findByAccountId = publicProcedure.input(z.string()).query(async ({ input }) => {
    return await prisma.user.findUnique({
        where: {
            accountId: input
        }
    })
})

const findAll = publicProcedure.query(async () => {
    return await prisma.user.findMany()
})

const pollUser = publicProcedure
    .input(
        z.object({
            accountId: z.string()
        })
    )
    .query(async ({ input }) => {
        return await waitUntilPresent(() => prisma.user.findUnique({ where: { accountId: input.accountId } }))
    })

const deleteAll = publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return await prisma.user.deleteMany({
        where: {
            NOT: {
                id: {
                    equals: input
                }
            }
        }
    })
})

export const userRouter = router({
    findByAccountId,
    findAll,
    deleteAll,
    pollUser
})
