import { useFonts } from "expo-font"
import { Slot } from "expo-router"
import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { AuthProvider } from "../contexts/auth"
import { TrpcProvider } from "../contexts/trpc"
import { GRAY } from "../styles/color"

export const FONTS = {
    "Inter Thin": require("../../assets/fonts/Inter-Thin.ttf"),
    "Inter UltraLight": require("../../assets/fonts/Inter-ExtraLight.ttf"),
    "Inter Light": require("../../assets/fonts/Inter-Light.ttf"),
    "Inter Regular": require("../../assets/fonts/Inter-Regular.ttf"),
    "Inter Medium": require("../../assets/fonts/Inter-Medium.ttf"),
    "Inter SemiBold": require("../../assets/fonts/Inter-SemiBold.ttf"),
    "Inter Bold": require("../../assets/fonts/Inter-Bold.ttf"),
    "Inter ExtraBold": require("../../assets/fonts/Inter-ExtraBold.ttf"),
    "Inter Black": require("../../assets/fonts/Inter-Black.ttf")
} as const

export default function () {
    const insets = useSafeAreaInsets()

    const [fontsLoaded, fontError] = useFonts(FONTS)

    if (!fontsLoaded && !fontError) {
        return null
    }

    return (
        <AuthProvider>
            <TrpcProvider>
                <View
                    style={{
                        flex: 1,
                        paddingTop: insets.top,
                        paddingLeft: insets.left,
                        paddingBottom: insets.bottom,
                        paddingRight: insets.right,
                        backgroundColor: GRAY[100]
                    }}
                >
                    <Slot />
                </View>
            </TrpcProvider>
        </AuthProvider>
    )
}
