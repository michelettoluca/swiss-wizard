import { StyleSheet, Text as NativeText, TextProps as NativeTextProps, ColorValue } from "react-native"
import { Size } from "../styles"

type Weight = "regular" | "medium" | "semibold" | "bold"

type TextStyleProps = {
    size?: "xs" | "s" | "base" | "m" | "l" | "xl"
    color?: ColorValue
    weight?: Weight
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

const defaultColor: ColorValue = "#FFFFFF"

export function Text({ color, size, weight, children, ...props }: TextProps) {
    const style = StyleSheet.flatten([
        sizeStyles[size ?? "base"],
        weightStyles[weight ?? "regular"],
        { color: color ?? defaultColor }
    ])

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
