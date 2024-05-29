import { ReactNode } from "react"
import { ColorValue, StyleSheet, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native"
import { Palette } from "../styles/palette"
import { Size } from "../styles/size"

type Size = "s" | "m" | "l"

type ButtonProps = {
    size?: Size
    backgroundColor?: ColorValue
    icon?: ReactNode
} & TouchableOpacityProps

const pressableSize: Record<Size, ViewStyle> = {
    s: {
        paddingVertical: Size.XXS,
        paddingHorizontal: Size.S,
        borderRadius: Size.S
    },
    m: {
        paddingVertical: Size.XXS,
        paddingHorizontal: Size.M,
        borderRadius: Size.XS
    },
    l: {
        paddingVertical: Size.XS,
        paddingHorizontal: Size.BASE,
        borderRadius: Size.XXS
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
