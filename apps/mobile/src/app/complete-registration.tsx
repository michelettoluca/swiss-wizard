import { Pressable, Text } from "react-native"
import { useAuth } from "@clerk/clerk-expo"
import { trpc } from "../lib"
import { Redirect, useRouter } from "expo-router"

export default function () {
    const router = useRouter()
    const { userId: accountId } = useAuth()

    const { data: user, isLoading } = trpc.user.pollUser.useQuery(
        { accountId: accountId! },
        { enabled: Boolean(accountId) }
    )

    const { data } = trpc.user.findAll.useQuery()

    const { mutate: updateUsername } = trpc.user.updateUsername.useMutation()

    if (isLoading) {
        return <Text>"Loading..."</Text>
    }

    if (user?.username) {
        return <Redirect href="/(app)" />
    }

    function handlePress() {
        if (!user) {
            return
        }

        updateUsername({ id: user.id, username: "Lillo palle" })

        router.replace("/(app)")
    }

    return (
        <Pressable>
            <Text>Authenticate</Text>
            <Text>{JSON.stringify(data)}</Text>
            <Pressable disabled={isLoading} onPress={handlePress}>
                <Text>Complete registration</Text>
            </Pressable>
        </Pressable>
    )
}
