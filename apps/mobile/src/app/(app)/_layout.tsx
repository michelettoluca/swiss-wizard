import { useAuth } from "@clerk/clerk-expo"
import { Redirect, Stack } from "expo-router"
import { Text, View } from "react-native"
import { UserProvider } from "../../contexts/user"
import { Typography } from "../../styles/typography"

export default function () {
    const { isLoaded, isSignedIn } = useAuth()

    if (!isLoaded) {
        return (
            <View>
                <Text style={Typography.body}>Loading...</Text>
            </View>
        )
    }

    if (!isSignedIn) {
        return <Redirect href={"/"} />
    }

    return (
        <UserProvider>
            <Stack screenOptions={{ headerShown: false }} />
        </UserProvider>
    )
}
