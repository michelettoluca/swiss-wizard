import { useAuth, useUser } from "@clerk/clerk-expo"
import { PropsWithChildren, createContext, useContext } from "react"
import { Entities } from "server/src/prisma"
import { trpc } from "../lib"
import { Redirect, useRouter } from "expo-router"
import { Pressable, Text } from "react-native"

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

    const isRegistrationCompleted = Boolean(user.username)

    return (
        <UserContext.Provider
            value={{
                user,
                signOut: () => {
                    utils.user.pollUser.invalidate({ accountId })
                    signOut()
                }
            }}
        >
            {isRegistrationCompleted ? children : <CompleteRegistration />}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    return useContext(UserContext)
}

export function CompleteRegistration() {
    const { user } = useUserContext()
    const utils = trpc.useUtils()

    const { mutate: updateUsername } = trpc.user.updateUsername.useMutation()

    const completeRegistration = () => {
        updateUsername({ id: user.id, username: "Lillo palle" })

        utils.user.pollUser.invalidate()
    }

    return (
        <Pressable>
            <Text>Complete registration</Text>
            <Pressable onPress={completeRegistration}>
                <Text>Set username "Lillo Palle"</Text>
            </Pressable>
        </Pressable>
    )
}
