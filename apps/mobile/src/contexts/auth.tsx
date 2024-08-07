import { ClerkProvider } from "@clerk/clerk-expo"
import * as SecureStore from "expo-secure-store"
import type { TokenCache } from "@clerk/clerk-expo/dist/cache"
import { PropsWithChildren } from "react"

const tokenCache: TokenCache = {
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

export function AuthProvider({ children }: PropsWithChildren) {
    return (
        <ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
            {children}
        </ClerkProvider>
    )
}
