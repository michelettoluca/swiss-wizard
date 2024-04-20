import { useLocalSearchParams } from "expo-router"
import { Text } from "react-native"

export default function () {
    const { id } = useLocalSearchParams()

    return <Text>{id ?? "WAGLIOOO"}</Text>
}
