import { StyleSheet, Text as NativeText, TextProps as NativeTextProps, ColorValue } from "react-native"
import { Colors, Size } from "../styles"

type Weight = "regular" | "medium" | "semibold" | "bold"

type TextStyleProps = {
    size?: "xs" | "s" | "base" | "m" | "l" | "xl"
    color?: ColorValue
    weight?: Weight
    align?: "left" | "center" | "right"
}

type TextProps = { children: string } & TextStyleProps & Omit<NativeTextProps, "children" | "style">

const sizeStyles = StyleSheet.create({
    xs: {
        fontSize: Size.xs
    },
    s: {
        fontSize: Size.s
    },
    base: {
        fontSize: Size.base
    },
    m: {
        fontSize: Size.m
    },
    l: {
        fontSize: Size.l
    },
    xl: {
        fontSize: Size.xl
    }
})

const weightStyles = StyleSheet.create({
    regular: {
        fontFamily: "Geist Regular"
    },
    medium: {
        fontFamily: "Geist Medium"
    },
    semibold: {
        fontFamily: "Geist SemiBold"
    },
    bold: {
        fontFamily: "Geist Bold"
    }
})

const alignStyles = StyleSheet.create({
    left: {
        textAlign: "left"
    },
    center: {
        textAlign: "center"
    },
    right: {
        textAlign: "right"
    }
})

const defaultColor: ColorValue = Colors.gray[600]

export function Text({ color, size, weight, align, children, ...props }: TextProps) {
    const style = StyleSheet.flatten([
        alignStyles[align ?? "left"],
        sizeStyles[size ?? "base"],
        weightStyles[weight ?? "regular"],
        { color: color ?? defaultColor }
    ])

    console.log(style)

    return (
        <NativeText style={style} {...props}>
            {children}
        </NativeText>
    )
}

export const headerStyle: TextStyleProps = {
    size: "s",
    color: "#ffffff",
    weight: "regular"
} as const
