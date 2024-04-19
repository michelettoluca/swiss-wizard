import { ReactNode } from "react"
import { ColorValue, StyleSheet, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native"
import { Palette } from "../styles/palette"
import { BASE, M, S, XS, XXS } from "../styles/size"

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
        paddingVertical: XS,
        paddingHorizontal: BASE,
        borderRadius: XXS
    }
} as const

export function Button({ size, backgroundColor, style, ...props }: ButtonProps) {
    return (
        <TouchableOpacity
            style={StyleSheet.flatten([
                {
                    ...pressableSize[size ?? "m"],
                    backgroundColor: props.disabled ? Palette.gray[400] : backgroundColor ?? Palette.blue[500]
                },
                style
            ])}
            {...props}
        />
    )
}
