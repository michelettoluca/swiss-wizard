import express from "express"
import cors from "cors"
import { trpcMiddleware } from "./routers/app"

const app = express()

app.use(
	cors({
		origin: [
			"http://localhost:3000",
			"http://localhost:3001",
			"http://localhost:3002",
		],
		credentials: true,
	})
)

app.use("/trpc", trpcMiddleware)

app.listen(4000)
