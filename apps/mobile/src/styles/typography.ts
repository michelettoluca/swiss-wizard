import { TextStyle } from "react-native"
import { Palette } from "./palette"

export const Inter = {
    thin: "Inter Thin",
    extraLight: "Inter ExtraLight",
    light: "Inter Light",
    regular: "Inter Regular",
    medium: "Inter Medium",
    semiBold: "Inter SemiBold",
    bold: "Inter Bold",
    extraBold: "Inter ExtraBold",
    black: "Inter Black"
} as const

export const Typography = {
    header: {
        fontFamily: Inter.semiBold,
        fontSize: 16,
        color: Palette.gray[900]
    },
    body: {
        fontFamily: Inter.regular,
        fontSize: 14,
        color: Palette.gray[600]
    },
    label: {
        fontFamily: Inter.regular,
        fontSize: 12,
        color: Palette.gray[600]
    }
} as const satisfies Record<string, TextStyle>
