import { Pressable, Text } from "react-native"
import { useCallback, useEffect } from "react"
import { useAuth, useOAuth } from "@clerk/clerk-expo"
import { useWarmUpBrowser } from "../hooks"
import * as AuthSession from "expo-auth-session"
import { Redirect, SplashScreen } from "expo-router"

SplashScreen.preventAutoHideAsync()

export default function () {
    useWarmUpBrowser()

    const { isSignedIn, isLoaded } = useAuth()
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" })

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            SplashScreen.hideAsync()
        }
    }, [isLoaded, isSignedIn])

    const authenticate = async () => {
        const { createdSessionId, setActive } = await startOAuthFlow({
            redirectUrl: AuthSession.makeRedirectUri({ path: "/" })
        })

        if (createdSessionId) {
            await setActive?.({ session: createdSessionId })
        }
    }

    if (!isLoaded) {
        return <Text>@index.tsx / Lodaing auth</Text>
    }

    if (isSignedIn) {
        return <Redirect href="/(app)" />
    }

    return (
        <Pressable onPress={() => authenticate()}>
            <Text>Sign-in</Text>
        </Pressable>
    )
}
