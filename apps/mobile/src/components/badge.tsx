import { PropsWithChildren } from "react"
import { ColorValue, StyleSheet, View, ViewStyle } from "react-native"
import { XL, XXS, XXXS } from "../styles/size"
import { RED, AMBER, EMERALD, GRAY } from "../styles/color"
import { Text } from "./text"

type Theme = "red" | "amber" | "emerald" | "gray"

const box: ViewStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: XL,
    borderRadius: XXXS,
    alignSelf: "flex-start",
    paddingHorizontal: XXS
}

const backgroundColor: Record<Theme, ViewStyle> = {
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

const textColor: Record<Theme, ColorValue> = {
    red: RED[500],
    amber: AMBER[500],
    emerald: EMERALD[600],
    gray: GRAY[600]
} as const

type BadgeProps = {
    theme: Theme
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
