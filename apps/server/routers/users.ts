import { z } from "zod"
import { router, publicProcedure } from "../trpc"

export const userRouter = router({
	userList: publicProcedure
		.input(
			z.object({
				sium: z.string(),
			})
		)
		.query(({ input, ctx }) => {
			console.log(ctx.req.headers.authorization)

			return input.sium
		}),
})
