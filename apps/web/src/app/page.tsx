import trpc from "utils/trpc/client"

export default async function Page(): Promise<JSX.Element> {
	const user = await trpc.userList.query({ sium: "jsone" })

	return <pre>user: {JSON.stringify(user, null, 3)}</pre>
}
