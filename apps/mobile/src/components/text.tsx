import { ColorValue, Text as NativeText, TextProps as NativeTextProps, StyleSheet, TextStyle } from "react-native"
import { GRAY } from "../styles/color"

type Weight = "regular" | "medium" | "semibold" | "bold"

type Align = "left" | "center" | "right"
type Size = number
type TextStyleProps = {
    size?: Size
    color?: ColorValue
    weight?: Weight
    align?: Align
}

type TextProps = TextStyleProps & Omit<NativeTextProps, "style">

const weightStyles: Record<Weight, TextStyle> = {
    regular: {
        fontFamily: "Inter Regular"
    },
    medium: {
        fontFamily: "Inter Medium"
    },
    semibold: {
        fontFamily: "Inter SemiBold"
    },
    bold: {
        fontFamily: "Inter Bold"
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
        {
            fontSize: size
        },
        weightStyles[weight ?? "regular"],
        { color: color ?? defaultColor }
    ])

    return (
        <NativeText style={style} {...props}>
            {children}
        </NativeText>
    )
}
