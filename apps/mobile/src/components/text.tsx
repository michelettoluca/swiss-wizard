import { StyleSheet, Text as NativeText, TextProps as NativeTextProps, ColorValue, TextStyle } from "react-native"
import { GRAY } from "../styles/color"
import { BASE, L, M, S, XL, XS } from "../styles/size"

type Weight = "regular" | "medium" | "semibold" | "bold"

type Align = "left" | "center" | "right"
type Size = "xs" | "s" | "base" | "m" | "l" | "xl"
type TextStyleProps = {
    size?: Size
    color?: ColorValue
    weight?: Weight
    align?: Align
}

type TextProps = TextStyleProps & Omit<NativeTextProps, "style">

const sizeStyles: Record<Size, TextStyle> = {
    xs: {
        fontSize: XS
    },
    s: {
        fontSize: S
    },
    base: {
        fontSize: BASE
    },
    m: {
        fontSize: M
    },
    l: {
        fontSize: L
    },
    xl: {
        fontSize: XL
    }
}

const weightStyles: Record<Weight, TextStyle> = {
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
}

const $align: Record<Align, TextStyle> = {
    left: {
        textAlign: "left"
    },
    center: {
        textAlign: "center"
    },
    right: {
        textAlign: "right"
    }
}

const defaultColor: ColorValue = GRAY[600]

export function Text({ color, size, weight, align, children, ...props }: TextProps) {
    const style = StyleSheet.flatten([
        $align[align ?? "left"],
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
