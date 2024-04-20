import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { prisma } from "../prisma"
import { loggedProcedure, router } from "../trpc"

const createTournament = loggedProcedure
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

export const tournamentRouter = router({
    createTournament
})
