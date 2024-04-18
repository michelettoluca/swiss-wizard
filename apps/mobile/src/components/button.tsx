import { View } from "lucide-react-native"
import { ReactNode } from "react"
import { ColorValue, StyleSheet, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native"
import { Palette } from "../styles/palette"
import { L, M, S, XL, XS, XXS } from "../styles/size"

type Size = "s" | "m" | "l"

type ButtonProps = {
    size?: Size
    backgroundColor?: ColorValue
    icon?: ReactNode
} & TouchableOpacityProps

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
        paddingVertical: M,
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
        <TouchableOpacity
            style={StyleSheet.flatten([
                {
                    ...pressableSize[size ?? "m"],
                    backgroundColor: backgroundColor ?? Palette.blue[500]
                },
                style
            ])}
            {...props}
        >
            {icon && <View style={{ ...iconMargin[size ?? "m"] }}>{icon}</View>}
            {children}
        </TouchableOpacity>
    )
}
