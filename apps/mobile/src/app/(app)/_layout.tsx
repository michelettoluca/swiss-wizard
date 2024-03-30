import { Stack } from "expo-router"
import { UserProvider } from "../../contexts"

export default function AppLayout() {
    return (
        <UserProvider>
            <Stack />
        </UserProvider>
    )
}
