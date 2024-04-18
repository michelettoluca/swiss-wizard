import { PropsWithChildren } from "react"
import { Text, View } from "react-native"
import { Palette } from "../styles/palette"
import { BASE, S, XS, XXL, XXS } from "../styles/size"
import { Inter, Typography } from "../styles/typography"
import { Avatar } from "./avatar"

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
                backgroundColor: Palette.white,
                borderRadius: XS
            }}
        >
            <Avatar size={XXL} color={Palette.amber[200]} />
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flexGrow: 1
                }}
            >
                <View style={{ display: "flex", gap: XXS }}>
                    <Text
                        style={{
                            fontFamily: Inter.medium,
                            fontSize: S,
                            color: Palette.gray[900]
                        }}
                    >
                        {name}
                    </Text>
                    <Text
                        style={{
                            ...Typography.body,
                            color: Palette.gray[900]
                        }}
                    >
                        {date}
                    </Text>
                </View>
                <Text>{rank}°</Text>
            </View>
        </View>
    )
}
