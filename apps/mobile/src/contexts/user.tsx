import { useAuth, useUser as useClerkUser } from "@clerk/clerk-expo"
import { Redirect, SplashScreen } from "expo-router"
import { PropsWithChildren, createContext, useContext, useEffect } from "react"
import { Pressable, Text } from "react-native"
import { Entities } from "server/src/prisma"
import { Button } from "../components/button"
import { trpc } from "../lib/trpc"

type UserContextValue = {
    user: Omit<Entities["User"], "createdAt">
    clerkUser: ReturnType<typeof useClerkUser>["user"]
    signOut: () => void
}

const User = createContext<UserContextValue>({} as UserContextValue)

export function UserProvider({ children }: PropsWithChildren) {
    const { userId: accountId, isSignedIn, signOut, isLoaded } = useAuth()
    const { user: clerkUser } = useClerkUser()
    const utils = trpc.useUtils()

    const { data: user, isLoading } = trpc.user.pollUser.useQuery(
        { accountId: accountId! },
        { enabled: Boolean(accountId), staleTime: Infinity }
    )

    useEffect(() => {
        if (isLoaded && user) {
            SplashScreen.hideAsync()
        }
    }, [isLoaded, user])

    if (!isLoaded) {
        return <Text>@user-context.tsx / Loading useAuth</Text>
    }

    if (!isSignedIn) {
        return <Redirect href="/" />
    }

    if (isLoading) {
        return <Text>@user-context.tsx / Loading user</Text>
    }

    if (!user) {
        return <Text>@user-context.tsx / Error while creating the account</Text>
    }

    return (
        <User.Provider
            value={{
                user,
                clerkUser,
                signOut: async () => {
                    await utils.user.pollUser.invalidate({ accountId })
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
