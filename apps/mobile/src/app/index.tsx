import { useAuth, useOAuth } from "@clerk/clerk-expo"
import * as AuthSession from "expo-auth-session"
import { Redirect, SplashScreen } from "expo-router"
import { useEffect } from "react"
import { Pressable, Text, View } from "react-native"
import { useWarmUpBrowser } from "../hooks/use-warm-up-browser"
import { Palette } from "../styles/palette"
import { BASE, L, XL, XS, XXL } from "../styles/size"
import { Inter, Typography } from "../styles/typography"
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
        return <Redirect href="/(app)" />
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
                <Text
                    style={{
                        color: Palette.gray[900],
                        fontFamily: Inter.bold,
                        fontSize: XL
                    }}
                >
                    Swiss Wizard
                </Text>
                <Text style={{ textAlign: "center" }}>
                    Grande sottotitolo, importantissimo e su più righe con punto.
                </Text>
            </View>
            <View style={{ alignSelf: "stretch", borderRadius: 1000, overflow: "hidden" }}>
                <Pressable
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: XS,
                        paddingVertical: 16,
                        borderColor: Palette.gray[300],
                        borderWidth: 1,
                        borderRadius: 1000
                    }}
                    android_ripple={{ color: "rgba(0, 0, 0, 0.05)", radius: 1000, foreground: false }}
                    onPress={() => authenticate()}
                >
                    <GoogleG width={24} height={24} />
                    <Text style={Typography.body}>Sign in with Google</Text>
                </Pressable>
            </View>
        </View>
    )
}
