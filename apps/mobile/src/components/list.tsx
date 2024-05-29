import { PropsWithChildren } from "react"
import { View } from "react-native"
import { Size } from "../styles/size"

type ListProps = {
    type?: "compact" | "default"
    direction?: "column" | "row"
} & PropsWithChildren

export function List({ type, direction, children }: ListProps) {
    return (
        <View
            style={{
                flexDirection: direction,
                gap: type === "compact" ? undefined : Size.XXS,
                borderRadius: type === "compact" ? Size.XS : undefined,
                overflow: type === "compact" ? "hidden" : undefined
            }}
        >
            {children}
        </View>
    )
}
