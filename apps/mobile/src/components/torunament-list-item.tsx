import { Text, View } from "react-native"
import { Palette } from "../styles/palette"
import { Size } from "../styles/size"
import { Inter, Typography } from "../styles/typography"
import { Avatar } from "./avatar"

type ActivityItemProps = {
    name: string
    rank: number
    date: string
}

export function TournamentListItem({ date, name, rank }: ActivityItemProps) {
    return (
        <View
            style={{
                flexDirection: "row",
                gap: Size.XS,
                padding: Size.BASE,
                backgroundColor: Palette.white,
                borderRadius: Size.XS
            }}
        >
            <Avatar size={Size.XXL} color={Palette.amber[200]} />
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flexGrow: 1
                }}
            >
                <View style={{ gap: Size.XXS }}>
                    <Text
                        style={{
                            fontFamily: Inter.medium,
                            fontSize: Size.S,
                            color: Palette.gray[900]
                        }}
                    >
                        {name}
                    </Text>
                    <Text
                        style={[
                            Typography.body,
                            {
                                color: Palette.gray[900]
                            }
                        ]}
                    >
                        {date}
                    </Text>
                </View>
                <Text>{rank}°</Text>
            </View>
        </View>
    )
}
