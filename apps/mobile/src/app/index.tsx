import { useAuth, useOAuth } from "@clerk/clerk-expo"
import * as AuthSession from "expo-auth-session"
import { Redirect, SplashScreen } from "expo-router"
import { useEffect } from "react"
import { Pressable, View } from "react-native"
import { Text } from "../components/text"
import { useWarmUpBrowser } from "../hooks/use-warm-up-browser"
import { GRAY } from "../styles/color"
import { BASE, L, S, XL, XS, XXL } from "../styles/size"
import { GoogleG } from "../svgs/google-g"

// SplashScreen.preventAutoHideAsync()

export default function () {
    useWarmUpBrowser()

    const { isSignedIn, isLoaded } = useAuth()
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" })

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            console.log("@app/index - SplashScreen.hideAsync()")
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
        return <Redirect href="/(app)/home" />
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: BASE,
                gap: XXL
            }}
        >
            <View style={{ alignItems: "center", padding: L }}>
                <Text color={GRAY[800]} size={XL} weight="bold">
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
                        gap: XS,
                        paddingVertical: 16,
                        borderColor: GRAY[300],
                        borderWidth: 1,
                        borderRadius: 1000
                    }}
                    android_ripple={{ color: "rgba(0, 0, 0, 0.05)", radius: 1000, foreground: false }}
                    onPress={() => authenticate()}
                >
                    <GoogleG width={24} height={24} />
                    <Text size={S} color={GRAY[600]}>
                        Sign in with Google
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}
