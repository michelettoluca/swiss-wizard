import { PropsWithChildren } from "react"
import { ColorValue, StyleSheet, View, ViewStyle } from "react-native"
import { XL, XXS, XXXS } from "../styles/size"
import { RED, AMBER, EMERALD, GRAY } from "../styles/color"
import { Text } from "./text"

export type BadgeTheme = "red" | "amber" | "emerald" | "gray"

const box: ViewStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: XL,
    borderRadius: XXXS,
    paddingHorizontal: XXS,
    paddingVertical: 1
}

const backgroundColor: Record<BadgeTheme, ViewStyle> = {
    red: {
        backgroundColor: RED[100]
    },
    amber: {
        backgroundColor: AMBER[100]
    },
    emerald: {
        backgroundColor: EMERALD[100]
    },
    gray: {
        backgroundColor: GRAY[100]
    }
} as const

const textColor: Record<BadgeTheme, ColorValue> = {
    red: RED[500],
    amber: AMBER[500],
    emerald: EMERALD[600],
    gray: GRAY[600]
} as const

type BadgeProps = {
    theme: BadgeTheme
} & PropsWithChildren

export function Badge({ theme, children }: BadgeProps) {
    const style = StyleSheet.flatten([box, backgroundColor[theme]])

    return (
        <View style={style}>
            <Text size="xs" color={textColor[theme]}>
                {children}
            </Text>
        </View>
    )
}
