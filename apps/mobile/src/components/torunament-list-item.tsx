import { PropsWithChildren } from "react"
import { View } from "react-native"
import { BASE, XS, XXS } from "../styles/size"
import { AMBER, GRAY, WHITE } from "../styles/color"
import { Avatar } from "./avatar"
import { Text } from "./text"
import { Badge } from "./badge"

type ActivityItemProps = {
    name: string
    rank: number
    date: string
} & PropsWithChildren

export function TournamentListItem({ date, name, rank }: ActivityItemProps) {
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                gap: XS,
                padding: BASE,
                backgroundColor: WHITE,
                borderRadius: XS
            }}
        >
            <Avatar color={AMBER[200]} />
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flexGrow: 1
                }}
            >
                <View style={{ display: "flex", gap: XXS }}>
                    <Text weight="medium" color={GRAY[900]}>
                        {name}
                    </Text>
                    <Text size="s" color={GRAY[400]}>
                        {date}
                    </Text>
                </View>
                <Text>{rank}°</Text>
            </View>
        </View>
    )
}
