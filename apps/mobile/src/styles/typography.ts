import { TextStyle } from "react-native"

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

export const header: TextStyle = {
    fontFamily: Inter.semiBold,
    fontSize: 16
}

export const body: TextStyle = {
    fontFamily: Inter.regular,
    fontSize: 14
} as const

export const label: TextStyle = {
    fontFamily: Inter.regular,
    fontSize: 10
} as const
