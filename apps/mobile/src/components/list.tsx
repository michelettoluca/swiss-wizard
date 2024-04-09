import { PropsWithChildren } from "react"
import { View } from "react-native"
import { XS, XXS } from "../styles/size"

type ListProps = {
    type?: "compact" | "default"
    direction?: "column" | "row"
} & PropsWithChildren

export function List({ type, direction, children }: ListProps) {
    return (
        <View
            style={{
                display: "flex",
                flexDirection: direction,
                gap: type === "compact" ? undefined : XXS,
                borderRadius: type === "compact" ? XS : undefined,
                overflow: type === "compact" ? "hidden" : undefined
            }}
        >
            {children}
        </View>
    )
}
