import { Pressable, Text } from "react-native"
import { useCallback } from "react"
import { useOAuth } from "@clerk/clerk-expo"
import { useWarmUpBrowser } from "../hooks"
import * as AuthSession from "expo-auth-session"
import { useRouter } from "expo-router"

export default function () {
    useWarmUpBrowser()

    const router = useRouter()

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" })

    const authenticate = useCallback(async () => {
        const { createdSessionId, setActive } = await startOAuthFlow({
            redirectUrl: AuthSession.makeRedirectUri({ path: "/" })
        })

        if (createdSessionId) {
            await setActive?.({ session: createdSessionId })
            router.replace("/") // Hack
        }
    }, [])

    return (
        <Pressable onPress={() => authenticate()}>
            <Text>Authenticate</Text>
        </Pressable>
    )
}
