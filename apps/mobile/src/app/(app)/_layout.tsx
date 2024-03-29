import { Stack } from "expo-router"
import { UserProvider } from "../../context"

export default function AppLayout() {
    return (
        <UserProvider>
            <Stack />
        </UserProvider>
    )
}
