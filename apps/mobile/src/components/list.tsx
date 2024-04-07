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
                gap: type === "compact" ? 0 : XXS,
                borderRadius: XS,
                overflow: "hidden"
            }}
        >
            {children}
        </View>
    )
}
