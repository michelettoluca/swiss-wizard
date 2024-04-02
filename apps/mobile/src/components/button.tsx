import { Pressable, PressableProps, StyleSheet, View } from "react-native"
import { Text } from "./text"
import { ReactElement } from "react"
import { Colors, Size } from "../styles"

type ButtonProps = {
    size?: "sm" | "base" | "lg"
    type?: "danger" | "default"
    icon?: ReactElement
    children: string
} & Omit<PressableProps, "children">

const pressableSizeStyles = StyleSheet.create({
    sm: {
        paddingVertical: Size.xxs,
        paddingHorizontal: Size.s,
        borderRadius: Size.s
    },
    base: {
        paddingVertical: Size.xxs,
        paddingHorizontal: Size.m,
        borderRadius: Size.xs
    },
    lg: {
        paddingVertical: Size.l,
        paddingHorizontal: Size.xl,
        borderRadius: Size.xxs
    }
})

const typeStyles = StyleSheet.create({
    danger: {
        backgroundColor: Colors.blue[500]
    },
    default: {
        backgroundColor: Colors.blue[500]
    }
})

const iconMarginStyle = StyleSheet.create({
    sm: {
        marginLeft: -Size.xxs
    },
    base: {
        marginLeft: -Size.xs
    },
    lg: {
        marginLeft: -Size.l
    }
})

export function Button({ size, type, icon, children, ...props }: ButtonProps) {
    const pressableStyle = StyleSheet.flatten([pressableSizeStyles[size ?? "base"], typeStyles[type ?? "default"]])
    const iconStyle = [iconMarginStyle[size ?? "base"]]

    return (
        <Pressable style={pressableStyle} {...props}>
            {icon && <View style={iconStyle}>{icon}</View>}
            <Text size="xs">{children}</Text>
        </Pressable>
    )
}
