import { TextStyle } from "react-native"

export const Geist = {
    thin: "Geist Thin",
    light: "Geist Light",
    ultraLight: "Geist UltraLight",
    regular: "Geist Regular",
    medium: "Geist Medium",
    semiBold: "Geist SemiBold",
    bold: "Geist Bold",
    black: "Geist Black",
    ultraBlack: "Geist UltraBlack"
} as const

export const header: TextStyle = {
    fontFamily: Geist.semiBold,
    fontSize: 16
}

export const body: TextStyle = {
    fontFamily: Geist.regular,
    fontSize: 14
}

export const label: TextStyle = {
    fontFamily: Geist.regular,
    fontSize: 10
}
