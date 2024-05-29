import { ColorValue, Image } from "react-native"
import { useUser } from "../contexts/user"

type AvatarProps = {
    size: number
    color?: ColorValue
    imageUrl?: string
}

export function Avatar({ size, color }: AvatarProps) {
    const { clerkUser } = useUser()
    return (
        <Image
            style={{
                borderRadius: Number.MAX_SAFE_INTEGER,
                backgroundColor: color,
                height: size,
                width: size
            }}
            source={{ uri: clerkUser?.imageUrl }}
        />
    )
}
