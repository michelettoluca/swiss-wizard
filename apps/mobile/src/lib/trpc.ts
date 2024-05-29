import { createTRPCReact } from "@trpc/react-query"
import { AppRouter } from "server/src/routers"

export const trpc = createTRPCReact<AppRouter>()
