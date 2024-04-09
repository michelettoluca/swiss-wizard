import { PropsWithChildren } from "react"
import { View } from "react-native"
import { AMBER, EMERALD, GRAY, RED } from "../styles/color"
import { XL, XS, XXS, XXXS } from "../styles/size"
import { Text } from "./text"

export type BadgeTheme = "red" | "amber" | "emerald" | "gray"

const backgroundColor = {
    red: RED[100],
    amber: AMBER[100],
    emerald: EMERALD[100],
    gray: GRAY[100]
} as const

const textColor = {
    red: RED[500],
    amber: AMBER[500],
    emerald: EMERALD[600],
    gray: GRAY[600]
} as const

type BadgeProps = {
    theme: BadgeTheme
} & PropsWithChildren

export function Badge({ theme, children }: BadgeProps) {
    return (
        <View
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: XL,
                borderRadius: XXXS,
                paddingHorizontal: XXS,
                paddingVertical: 1,
                backgroundColor: backgroundColor[theme]
            }}
        >
            <Text size={XS} color={textColor[theme]}>
                {children}
            </Text>
        </View>
    )
}
