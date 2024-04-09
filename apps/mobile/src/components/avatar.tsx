import { ColorValue, View } from "react-native"

type AvatarProps = {
    size: number
    color?: ColorValue
    imageUrl?: string
}

export function Avatar({ size, color }: AvatarProps) {
    return (
        <View
            style={{
                borderRadius: Number.MAX_SAFE_INTEGER,
                backgroundColor: color,
                height: size,
                width: size
            }}
        />
    )
}
