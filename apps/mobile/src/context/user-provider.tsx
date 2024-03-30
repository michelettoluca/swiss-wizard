import { useAuth } from "@clerk/clerk-expo"
import { PropsWithChildren, createContext, useContext } from "react"
import { Entities } from "server/src/prisma"
import { trpc } from "../lib"
import { Redirect } from "expo-router"
import { Text } from "react-native"

type UserContextValue = {
    user: Omit<Entities["User"], "createdAt">
    signOut: () => void
}

const UserContext = createContext<UserContextValue>({} as UserContextValue)

export function UserProvider({ children }: PropsWithChildren) {
    const { userId, isSignedIn, signOut, isLoaded } = useAuth()
    const utils = trpc.useUtils()
    const { data: user } = trpc.user.findByAccountId.useQuery(userId!, { enabled: isSignedIn })

    if (isLoaded && !isSignedIn) {
        return <Redirect href="/sign-in" />
    }

    if (!user) {
        return <Text>Loading...</Text>
    }

    return (
        <UserContext.Provider
            value={{
                user,
                signOut: () => {
                    utils.user.findByAccountId.invalidate(userId)
                    signOut()
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
