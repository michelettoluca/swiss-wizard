import { TRPCError, initTRPC } from "@trpc/server"
import { Context } from "."
import { Clerk } from "@clerk/clerk-sdk-node"

const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure

const clerk = Clerk({
    jwtKey: process.env.CLERK_JWT_TOKEN
})

export const loggedProcedure = publicProcedure.use(async (opts) => {
    const token = opts.ctx.token

    if (!token) {
        throw new TRPCError({ code: "UNAUTHORIZED" })
    }

    try {
        const decoded = await clerk.verifyToken(token)

        return opts.next({
            ctx: {
                decoded
            }
        })
    } catch {
        throw new TRPCError({ code: "UNAUTHORIZED" })
    }
})

export const mergeRouters = t.mergeRouters
