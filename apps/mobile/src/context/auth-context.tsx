import { ClerkProvider } from "@clerk/clerk-expo"
import * as SecureStore from "expo-secure-store"

const tokenCache = {
    async getToken(key: string) {
        try {
            return SecureStore.getItemAsync(key)
        } catch (err) {
            return null
        }
    },
    async saveToken(key: string, value: string) {
        try {
            return SecureStore.setItemAsync(key, value)
        } catch (err) {
            return
        }
    }
}

export function AuthProvider({ children }: React.PropsWithChildren) {
    return (
        <ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
            {children}
        </ClerkProvider>
    )
}
