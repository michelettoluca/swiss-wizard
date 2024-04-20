import { router } from "../trpc"
import { tournamentRouter } from "./tournament"
import { userRouter } from "./user"

export const appRouter = router({ user: userRouter, tournament: tournamentRouter })

export type AppRouter = typeof appRouter
