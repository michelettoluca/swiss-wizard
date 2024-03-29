import { Text, View } from "react-native"
import { useUserContext } from "../../context"

export default function () {
    const user = useUserContext()

    return (
        <View>
            <Text>{JSON.stringify(user, null, 3)}</Text>
        </View>
    )
}
