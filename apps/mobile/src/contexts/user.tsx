import { useAuth, useUser as useClerkUser } from "@clerk/clerk-expo"
import { createContext, PropsWithChildren, useContext, useEffect } from "react"
import { Pressable, Text } from "react-native"
import { Entities } from "server/src/prisma"
import { Button } from "../components/button"
import { trpc } from "../lib/trpc"
import { SplashScreen } from "expo-router"

type UserContextValue = {
    user: Omit<Entities["User"], "createdAt">
    clerkUser: ReturnType<typeof useClerkUser>["user"]
    signOut: () => void
}

const User = createContext<UserContextValue>({} as UserContextValue)

export function UserProvider({ children }: PropsWithChildren) {
    const { userId: accountId, signOut } = useAuth()
    const { user: clerkUser } = useClerkUser()
    const utils = trpc.useUtils()

    const { data: user, isLoading } = trpc.user.pollUser.useQuery(
        { accountId: accountId! },
        { enabled: Boolean(accountId), staleTime: Infinity }
    )

    useEffect(() => {
        if (user) {
            SplashScreen.hideAsync()
        }
    }, [user])

    if (isLoading || !user) {
        return null
    }

    return (
        <User.Provider
            value={{
                user,
                clerkUser,
                signOut: async () => {
                    await utils.user.pollUser.invalidate({ accountId: accountId! })
                    await signOut()
                }
            }}
        >
            {user.completedRegistration ? children : <CompleteRegistration />}
        </User.Provider>
    )
}

export function useUser() {
    return useContext(User)
}

function CompleteRegistration() {
    const { user } = useUser()
    const utils = trpc.useUtils()
    const { data } = trpc.user.findAll.useQuery()

    const { mutate: completeRegistration } = trpc.user.completeRegistration.useMutation()

    return (
        <Pressable>
            <Text>Complete registration</Text>
            <Text>{JSON.stringify(data)}</Text>
            <Button
                onPress={() => {
                    completeRegistration({ id: user.id, username: "Lillo palle" })

                    utils.user.pollUser.invalidate()
                }}
            >
                Set username "Lillo Palle"
            </Button>
        </Pressable>
    )
}
