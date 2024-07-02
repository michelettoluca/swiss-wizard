import { StyleSheet, View, ViewProps } from "react-native"

export function Paywall({ children, style }: Pick<ViewProps, "style" | "children">) {
    return (
        <View style={StyleSheet.flatten([{ position: "relative", overflow: "hidden" }, style])}>
            {children}
            <View
                style={{
                    position: "absolute",
                    zIndex: 10,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)"
                }}
            ></View>
        </View>
    )
}
