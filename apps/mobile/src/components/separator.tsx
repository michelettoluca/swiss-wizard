import { ColorValue, View } from "react-native"

type SeparatorProps = {
    color: ColorValue
}

export function Separator({ color }: SeparatorProps) {
    return <View style={{ height: 1, backgroundColor: color }} />
}
