import { Pressable, PressableProps, StyleSheet, TextProps, View, ViewStyle } from "react-native"
import { Text } from "./text"
import { ReactElement } from "react"
import { L, M, S, XL, XS, XXS } from "../styles/size"
import { BLUE, AMBER, EMERALD, GRAY, RED, WHITE } from "../styles/color"

type Size = "s" | "m" | "l"
type Theme = "red" | "amber" | "emerald" | "gray" | "blue"

type ButtonProps = {
    size?: Size
    theme?: Theme
    icon?: ReactElement
} & Omit<PressableProps, "children"> &
    Pick<TextProps, "children">

const pressableSizeStyles: Record<Size, ViewStyle> = {
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
}

const backgroundColor: Record<Theme, ViewStyle> = {
    blue: {
        backgroundColor: BLUE[500]
    },
    red: {
        backgroundColor: RED[500]
    },
    amber: {
        backgroundColor: AMBER[500]
    },
    emerald: {
        backgroundColor: EMERALD[500]
    },
    gray: {
        backgroundColor: GRAY[500]
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

export function Button({ size, theme, icon, children, ...props }: ButtonProps) {
    const pressableStyle = StyleSheet.flatten([pressableSizeStyles[size ?? "m"], backgroundColor[theme ?? "blue"]])
    const iconStyle = iconMargin[size ?? "m"]

    return (
        <Pressable style={pressableStyle} {...props}>
            {icon && <View style={iconStyle}>{icon}</View>}
            <Text size="xs" weight="medium" color={WHITE}>
                {children}
            </Text>
        </Pressable>
    )
}
