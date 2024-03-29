import { Slot } from "expo-router"
import { AuthProvider, TrpcProvider } from "../providers"
import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function () {
    const insets = useSafeAreaInsets()

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
