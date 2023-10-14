import { createTRPCReact } from "@trpc/react-query"
import { AppRouter } from "server/routers/app"

const trpc = createTRPCReact<AppRouter>()

export default trpc
