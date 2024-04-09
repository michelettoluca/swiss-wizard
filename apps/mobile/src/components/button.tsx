import { View } from "lucide-react-native"
import { ReactNode } from "react"
import { ColorValue, Pressable, PressableProps, Text, TextProps, ViewStyle } from "react-native"
import { BLUE } from "../styles/color"
import { L, M, S, XL, XS, XXS } from "../styles/size"

type Size = "s" | "m" | "l"

type ButtonProps = {
    size?: Size
    backgroundColor?: ColorValue
    icon?: ReactNode
} & Omit<PressableProps, "style"> &
    Pick<TextProps, "style">

const pressableSize: Record<Size, ViewStyle> = {
    s: {
        paddingVertical: XXS,
        paddingHorizontal: S,
        borderRadius: S
    },
    m: {
        paddingVertical: XXS,
        paddingHorizontal: M,
        borderRadius: XS
    },
    l: {
        paddingVertical: L,
        paddingHorizontal: XL,
        borderRadius: XXS
    }
} as const

const iconMargin: Record<Size, ViewStyle> = {
    s: {
        marginLeft: -XXS
    },
    m: {
        marginLeft: -XS
    },
    l: {
        marginLeft: -L
    }
} as const

export function Button({ size, backgroundColor, icon, children, style, ...props }: ButtonProps) {
    return (
        // Hack terrificante
        <Text style={style}>
            <Pressable
                style={({ pressed }) => ({
                    ...pressableSize[size ?? "m"],
                    backgroundColor: backgroundColor ?? BLUE[500],
                    opacity: pressed ? 0.8 : 1
                })}
                {...props}
            >
                <>
                    {icon && <View style={{ ...iconMargin[size ?? "m"] }}>{icon}</View>}
                    {children}
                </>
            </Pressable>
        </Text>
    )
}
