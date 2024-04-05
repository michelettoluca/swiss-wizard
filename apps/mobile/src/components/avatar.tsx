import { ColorValue, View } from "react-native"
import * as Size from "../styles/size"

type AvatarProps = {
    color?: ColorValue
    imageUrl?: string
}

export function Avatar({ color }: AvatarProps) {
    return (
        <View
            style={{
                borderRadius: Number.MAX_SAFE_INTEGER,
                backgroundColor: color,
                height: Size.xxl,
                width: Size.xxl
            }}
        />
    )
}
