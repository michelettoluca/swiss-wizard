import { CreateExpressContextOptions } from "@trpc/server/adapters/express"
import { inferAsyncReturnType, initTRPC } from "@trpc/server"

const createContext = ({ req, res }: CreateExpressContextOptions) => ({
	req,
	res,
})
type Context = inferAsyncReturnType<typeof createContext>

const t = initTRPC.context<Context>().create()

export const middleware = t.middleware
export const router = t.router
export const mergeRouters = t.mergeRouters
export const publicProcedure = t.procedure
