import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { prisma } from "../prisma"
import { loggedProcedure, router } from "../trpc"

const create = loggedProcedure
    .input(
        z.object({
            name: z.string().min(4),
            roundLimit: z.number().nullish(),
            timeLimit: z.number().nullish(),
            format: z.string()
        })
    )
    .mutation(async ({ input, ctx }) => {
        const owner = await prisma.user.findUnique({
            where: { accountId: ctx.decoded.sub }
        })

        if (!owner) {
            throw new TRPCError({ message: "User not found", code: "NOT_FOUND" })
        }

        const tournament = await prisma.tournament.create({
            data: {
                ownerId: owner.id,
                name: input.name,
                roundLimit: input.roundLimit,
                timeLimit: input.timeLimit ?? 55,
                format: input.format
            }
        })

        return tournament
    })

const findById = loggedProcedure
    .input(
        z.object({
            id: z.number()
        })
    )
    .query(async ({ input }) => {
        return await prisma.tournament.findUnique({
            where: {
                id: input.id
            }
        })
    })

const findHosted = loggedProcedure
    .input(
        z.object({
            id: z.number()
        })
    )
    .query(async ({ input }) => {
        return await prisma.tournament.findMany({
            where: {
                ownerId: input.id
            }
        })
    })
export const tournamentRouter = router({
    create,
    findById,
    findHosted
})
