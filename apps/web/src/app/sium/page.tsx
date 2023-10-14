"use client"

import trpc from "utils/trpc/react-client"

type SiumPageProps = {}

export default function SiumPage({}: SiumPageProps) {
	const { data } = trpc.userList.useQuery({ sium: "sium" })

	return <pre>user: {JSON.stringify(data, null, 3)}</pre>
}
