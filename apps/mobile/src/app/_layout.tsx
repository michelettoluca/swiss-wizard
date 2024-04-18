import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { useFonts } from "expo-font"
import { Slot } from "expo-router"
import { View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { AuthProvider } from "../contexts/auth"
import { TrpcProvider } from "../contexts/trpc"
import { Palette } from "../styles/palette"

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
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <AuthProvider>
                    <TrpcProvider>
                        <View
                            style={{
                                flex: 1,
                                paddingTop: insets.top,
                                paddingLeft: insets.left,
                                paddingBottom: insets.bottom,
                                paddingRight: insets.right,
                                backgroundColor: Palette.gray[100]
                            }}
                        >
                            <Slot />
                        </View>
                    </TrpcProvider>
                </AuthProvider>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    )
}
