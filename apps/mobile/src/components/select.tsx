import { View } from "lucide-react-native"
import { Pressable } from "react-native"

export function Select() {
    return (
        <Pressable
            style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, backgroundColor: "red", zIndex: 10 }}
        >
            <View />
        </Pressable>
    )
}
