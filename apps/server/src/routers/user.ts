import { z } from "zod"
import { publicProcedure, router } from "../trpc"
import { prisma } from "../prisma"
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

const deleteAll = publicProcedure.mutation(async () => {
    return await prisma.user.deleteMany({
        where: {}
    })
})

const completeRegistration = publicProcedure
    .input(
        z.object({
            id: z.number(),
            username: z.string().min(3)
        })
    )
    .mutation(async ({ input }) => {
        return await prisma.user.update({
            where: { id: input.id },
            data: { username: input.username, completedRegistration: true }
        })
    })

export const userRouter = router({
    findByAccountId,
    findAll,
    deleteAll,
    pollUser,
    completeRegistration
})
