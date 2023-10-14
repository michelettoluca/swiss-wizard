import { createExpressMiddleware } from "@trpc/server/adapters/express"
import { mergeRouters } from "../trpc"
import { userRouter } from "./users"

const appRouter = mergeRouters(userRouter)

export type AppRouter = typeof appRouter

export const trpcMiddleware = createExpressMiddleware({
	router: appRouter,
})
