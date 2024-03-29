import * as trpcExpress from "@trpc/server/adapters/express"
import express from "express"
import { appRouter } from "./routers"
import bodyParser from "body-parser"
import { handleClerkWebhooks } from "./webhooks"

export const createContext = ({ req }: trpcExpress.CreateExpressContextOptions) => ({
    token: req.headers.authorization
})
export type Context = Awaited<ReturnType<typeof createContext>>

const app = express()

app.post("/api/webhooks", bodyParser.raw({ type: "application/json" }), handleClerkWebhooks)

app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext
    })
)

app.listen(4000)
