import { Pressable, Text } from "react-native"
import { useCallback } from "react"
import { useOAuth } from "@clerk/clerk-expo"
import { useWarmUpBrowser } from "../hooks"
import * as AuthSession from "expo-auth-session"

export default function () {
    useWarmUpBrowser()

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" })

    const authenticate = useCallback(async () => {
        const { createdSessionId, setActive } = await startOAuthFlow({
            redirectUrl: AuthSession.makeRedirectUri({ path: "/complete-registration" })
        })

        if (createdSessionId) {
            await setActive?.({ session: createdSessionId })
        }
    }, [])

    return (
        <Pressable onPress={() => authenticate()}>
            <Text>Authenticate</Text>
        </Pressable>
    )
}
