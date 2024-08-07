import { useAuth, useOAuth } from "@clerk/clerk-expo"
import * as AuthSession from "expo-auth-session"
import { Redirect, SplashScreen } from "expo-router"
import { useEffect } from "react"
import { Pressable, Text, View } from "react-native"
import { useWarmUpBrowser } from "../hooks/use-warm-up-browser"
import { Palette } from "../styles/palette"
import { Size } from "../styles/size"
import { Inter, Typography } from "../styles/typography"
import { GoogleG } from "../svgs/google-g"

SplashScreen.preventAutoHideAsync()

export default function() {
    useWarmUpBrowser()
    
    const { isSignedIn, isLoaded,userId } = useAuth()
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" })
    
    console.log({isSignedIn, isLoaded, userId})
    
    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            SplashScreen.hideAsync()
        }
    }, [isLoaded, isSignedIn])
    
    async function authenticate() {
        const { createdSessionId, setActive } = await startOAuthFlow({
            redirectUrl: AuthSession.makeRedirectUri({ path: "/" })
        })
        
        if (createdSessionId) {
            await setActive?.({ session: createdSessionId })
        }
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
                padding: Size.BASE,
                gap: Size.XXL
            }}
        >
            <View style={{ alignItems: "center", padding: Size.L }}>
                <Text
                    style={{
                        color: Palette.gray[900],
                        fontFamily: Inter.bold,
                        fontSize: Size.XL
                    }}
                >
                    Swiss Wizard
                </Text>
                <Text style={{
                    textAlign: "center",
                    fontFamily: Inter.regular
                }}>
                    Grande sottotitolo, importantissimo e su più righe con punto.
                </Text>
            </View>
            <View style={{ alignSelf: "stretch", borderRadius: 1000, overflow: "hidden" }}>
                <Pressable
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: Size.XS,
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
