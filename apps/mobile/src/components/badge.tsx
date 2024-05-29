import { PropsWithChildren } from "react"
import { Text, View } from "react-native"
import { Palette } from "../styles/palette"
import { Size } from "../styles/size"
import { Inter } from "../styles/typography"

export type BadgeTheme = "red" | "amber" | "emerald" | "gray"

const backgroundColor = {
    red: Palette.red[100],
    amber: Palette.amber[100],
    emerald: Palette.emerald[100],
    gray: Palette.gray[100]
} as const

const textColor = {
    red: Palette.red[500],
    amber: Palette.amber[500],
    emerald: Palette.emerald[600],
    gray: Palette.gray[600]
} as const

type BadgeProps = {
    theme: BadgeTheme
} & PropsWithChildren

export function Badge({ theme, children }: BadgeProps) {
    return (
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
                minWidth: Size.XL,
                borderRadius: Size.XXXS,
                paddingHorizontal: Size.XXS,
                paddingVertical: 1,
                backgroundColor: backgroundColor[theme]
            }}
        >
            <Text
                style={{
                    fontFamily: Inter.regular,
                    fontSize: Size.XS,
                    color: textColor[theme]
                }}
            >
                {children}
            </Text>
        </View>
    )
}
