import { Pressable, Text } from "react-native"
import { useCallback } from "react"
import { useAuth, useOAuth } from "@clerk/clerk-expo"
import { useWarmUpBrowser } from "../hooks"
import * as AuthSession from "expo-auth-session"
import { Redirect } from "expo-router"

export default function () {
    useWarmUpBrowser()

    const { isSignedIn } = useAuth()
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" })

    const authenticate = useCallback(async () => {
        const { createdSessionId, setActive } = await startOAuthFlow({
            redirectUrl: AuthSession.makeRedirectUri({ path: "/" })
        })

        if (createdSessionId) {
            await setActive?.({ session: createdSessionId })
        }
    }, [])

    if (isSignedIn) {
        return <Redirect href="/(app)" />
    }

    return (
        <Pressable onPress={() => authenticate()}>
            <Text>Sign-in</Text>
        </Pressable>
    )
}
