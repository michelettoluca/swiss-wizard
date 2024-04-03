import { useAuth } from "@clerk/clerk-expo"
import { PropsWithChildren, createContext, useContext, useEffect } from "react"
import { Entities } from "server/src/prisma"
import { trpc } from "../lib"
import { Redirect, SplashScreen } from "expo-router"
import { Pressable, Text } from "react-native"
import { Button } from "../components"

type UserContextValue = {
    user: Omit<Entities["User"], "createdAt">
    signOut: () => void
}

const UserContext = createContext<UserContextValue>({} as UserContextValue)

export function UserProvider({ children }: PropsWithChildren) {
    const { userId: accountId, isSignedIn, signOut, isLoaded } = useAuth()
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
        <UserContext.Provider
            value={{
                user,
                signOut: async () => {
                    await utils.user.pollUser.invalidate({ accountId })
                    await signOut()
                }
            }}
        >
            {user.completedRegistration ? children : <CompleteRegistration />}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    return useContext(UserContext)
}

function CompleteRegistration() {
    const { user } = useUserContext()
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
