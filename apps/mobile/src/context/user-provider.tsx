import { useAuth } from "@clerk/clerk-expo"
import { PropsWithChildren, createContext, useContext } from "react"
import { Entities } from "server/src/prisma"
import { trpc } from "../lib"
import { Redirect } from "expo-router"
import { Text } from "react-native"

type UserContextValue = Omit<Entities["User"], "createdAt"> & {
    signOut: () => void
}

const UserContext = createContext<UserContextValue>({} as UserContextValue)

export function UserProvider({ children }: PropsWithChildren) {
    const { userId, isSignedIn, signOut, isLoaded } = useAuth()
    const utils = trpc.useUtils()

    const { data: user } = trpc.user.pollUser.useQuery({ accountId: userId! }, { enabled: Boolean(userId) })

    if (isLoaded && !isSignedIn) {
        return <Redirect href="/sign-in" />
    }

    if (!user) {
        return <Text>Loading...</Text>
    }

    return (
        <UserContext.Provider
            value={{
                id: user.id,
                accountId: user.accountId,
                signOut: () => {
                    signOut()
                    utils.user.findByAccountId.invalidate(userId)
                }
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    return useContext(UserContext)
}
