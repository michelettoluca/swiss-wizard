import { useAuth } from "@clerk/clerk-expo"
import { Redirect, SplashScreen, Stack } from "expo-router"
import { UserProvider } from "../../contexts/user"

export default function() {
    const { isLoaded, isSignedIn } = useAuth()
    
    if (!isLoaded) {
        return null
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
