import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { trpc } from "../lib"
import { httpBatchLink } from "@trpc/client"
import { useAuth } from "@clerk/clerk-expo"
import { useState } from "react"

export function TrpcProvider({ children }: React.PropsWithChildren) {
    const { getToken } = useAuth()

    const [queryClient] = useState(() => new QueryClient())

    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: process.env.EXPO_PUBLIC_TRPC_URL!,
                    async headers() {
                        const authToken = await getToken()

                        return {
                            Authorization: authToken ?? undefined
                        }
                    }
                })
            ]
        })
    )

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpc.Provider>
    )
}
