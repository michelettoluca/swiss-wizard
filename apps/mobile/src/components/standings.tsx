import { Size } from "../styles/size"
import { Palette } from "../styles/palette"
import { Text, View } from "react-native"
import { Typography } from "../styles/typography"
import { Badge } from "./badge"
import { List } from "./list"
import { Separator } from "./separator"
import { Fragment } from "react"

type StandingProps = {
    player: {
        firstName: string
        lastName: string
    }
    score: number
    rank: number
    omw: number
    gw: number
    ogw: number
}

function Standing({ player, rank, omw, gw, ogw, score }: StandingProps) {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: Size.BASE,
                paddingRight: Size.M,
                backgroundColor: Palette.white
            }}
        >
            <View style={{ gap: Size.XXS }}>
                <View style={{ flexDirection: "row", gap: Size.XXS }}>
                    <View>
                        <Text style={Typography.body}>{rank}.</Text>
                    </View>
                    <Text style={Typography.body}>
                        {player.firstName} {player.lastName}
                    </Text>
                </View>
                <View style={{ flexDirection: "row", gap: Size.XXS }}>
                    <Badge theme="gray">OMW {omw.toFixed(2)}</Badge>
                    <Badge theme="gray">GW {gw.toFixed(2)}</Badge>
                    <Badge theme="gray">OGW {ogw.toFixed(2)}</Badge>
                </View>
            </View>
            <Text style={Typography.body}>{score}</Text>
        </View>
    )
}

export function Standings({ standings }: { standings: any[] }) {
    return (
        <List type={"compact"}>
            {[...standings, ...standings, ...standings, ...standings].map((tournament, i) => (
                <Fragment key={i}>
                    <Standing
                        key={tournament.id}
                        gw={1}
                        ogw={1}
                        omw={1}
                        player={{ firstName: tournament.name, lastName: "Cognome" }}
                        rank={i + 1}
                        score={i * 4}
                    />
                    {i < standings.length * 3 - 1 && <Separator color={Palette.gray["100"]} />}
                </Fragment>
            ))}
        </List>
    )
}
