import { Pressable, View } from "react-native"
import { useEffect } from "react"
import { useAuth, useOAuth } from "@clerk/clerk-expo"
import { useWarmUpBrowser } from "../hooks/use-warm-up-browser"
import * as AuthSession from "expo-auth-session"
import { Redirect, SplashScreen } from "expo-router"
import { Text } from "../components/text"
import * as Color from "../styles/color"
import * as Size from "../styles/size"
import { GoogleG } from "../svgs/google-g"

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
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: Size.base,
                gap: Size.xxl
            }}
        >
            <View style={{ alignItems: "center", padding: Size.l }}>
                <Text color={Color.gray[800]} size="xl" weight="bold">
                    Swiss Wizard
                </Text>
                <Text align="center">Grande sottotitolo, importantissimo e su più righe con punto.</Text>
            </View>
            <View style={{ alignSelf: "stretch", borderRadius: 1000, overflow: "hidden" }}>
                <Pressable
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: Size.xs,
                        paddingVertical: 16,
                        borderColor: Color.gray[300],
                        borderWidth: 1,
                        borderRadius: 1000
                    }}
                    android_ripple={{ color: "rgba(0, 0, 0, 0.05)", radius: 1000, foreground: false }}
                    onPress={() => authenticate()}
                >
                    <GoogleG width={24} height={24} />
                    <Text size="s" color={Color.gray[600]}>
                        Sign in with Google
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}
