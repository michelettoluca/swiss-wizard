import { Slot } from "expo-router"
import { TrpcProvider } from "../contexts/trpc"
import { AuthProvider } from "../contexts/auth"
import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useFonts } from "expo-font"

export const FONTS = {
    "Geist Thin": require("../../assets/fonts/Geist-Thin.otf"),
    "Geist Light": require("../../assets/fonts/Geist-Light.otf"),
    "Geist UltraLight": require("../../assets/fonts/Geist-UltraLight.otf"),
    "Geist Regular": require("../../assets/fonts/Geist-Regular.otf"),
    "Geist Medium": require("../../assets/fonts/Geist-Medium.otf"),
    "Geist SemiBold": require("../../assets/fonts/Geist-SemiBold.otf"),
    "Geist Bold": require("../../assets/fonts/Geist-Bold.otf"),
    "Geist Black": require("../../assets/fonts/Geist-Black.otf"),
    "Geist UltraBlack": require("../../assets/fonts/Geist-UltraBlack.otf")
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
                        paddingRight: insets.right
                    }}
                >
                    <Slot />
                </View>
            </TrpcProvider>
        </AuthProvider>
    )
}
