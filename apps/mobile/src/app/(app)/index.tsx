import { Pressable, Text, View } from "react-native"
import { useUserContext } from "../../context"

export default function () {
    const user = useUserContext()

    return (
        <View>
            <Pressable onPress={() => user.signOut()}>
                <Text>{JSON.stringify(user, null, 3)}</Text>
            </Pressable>
        </View>
    )
}
