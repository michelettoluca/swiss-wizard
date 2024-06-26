import { useLocalSearchParams, usePathname, useRouter } from "expo-router"
import { Fragment } from "react"
import { ScrollView, Text, View } from "react-native"
import { TournamentPreview } from "../../."
import { Badge } from "../../../../components/badge"
import { List } from "../../../../components/list"
import { PlayerResult } from "../../../../components/result"
import { Section } from "../../../../components/section"
import { Separator } from "../../../../components/separator"
import { Palette } from "../../../../styles/palette"
import { Size } from "../../../../styles/size"
import { Inter, Typography } from "../../../../styles/typography"

const ACTIVITIES = [
    {
        name: "Evento 1",
        rank: 1,
        score: 10,
        date: "15 gennaio 2024",
        opponent: { firstName: "Pietro", lastName: "Smusi" },
        player: { firstName: "Pietro", lastName: "Smusi" },
        wins: 2,
        losses: 1,
        omw: Math.random(),
        gw: Math.random(),
        ogw: Math.random()
    },
    {
        name: "Evento 2",
        rank: 99,
        score: 23,
        date: "1 febbraio 2024",
        opponent: { firstName: "Orazio", lastName: "Grinzosi" },
        player: { firstName: "Orazio", lastName: "Grinzosi" },
        wins: 0,
        losses: 1,
        omw: Math.random(),
        gw: Math.random(),
        ogw: Math.random()
    },
    {
        name: "Evento 3",
        rank: 16,
        score: 32,
        date: "7 aprile 2024",
        opponent: { firstName: "Silvio", lastName: "Berlusconi" },
        player: { firstName: "Silvio", lastName: "Berlusconi" },
        wins: 1,
        losses: 1,
        omw: Math.random(),
        gw: Math.random(),
        ogw: Math.random()
    }
] as const

export default function () {
    const { id } = useLocalSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    return (
        <ScrollView>
            <TournamentPreview
                style={{
                    paddingHorizontal: 32,
                    paddingTop: 96,
                    paddingBottom: 80
                }}
            />
            <View
                style={{
                    flexDirection: "row",
                    height: 88,
                    marginHorizontal: 16,
                    borderRadius: 12,
                    backgroundColor: Palette.white,
                    marginTop: -24
                }}
            >
                <View style={{ flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                        <Text
                            style={{
                                fontSize: Size.L,
                                fontFamily: Inter.medium,
                                color: Palette.gray[900]
                            }}
                        >
                            24
                        </Text>
                    </View>
                    <Text
                        style={{
                            fontFamily: Inter.regular,
                            color: Palette.gray[900]
                        }}
                    >
                        Points
                    </Text>
                </View>
                <View style={{ flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                        <Text
                            style={{
                                fontSize: Size.L,
                                fontFamily: Inter.medium,
                                color: Palette.gray[900]
                            }}
                        >
                            2
                        </Text>
                        <Text
                            style={{
                                fontSize: Size.S,
                                fontFamily: Inter.regular,
                                color: Palette.gray[400]
                            }}
                        >
                            /64
                        </Text>
                    </View>
                    <Text
                        style={{
                            fontFamily: Inter.regular,
                            color: Palette.gray[900]
                        }}
                    >
                        Rank
                    </Text>
                </View>
                <View style={{ flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                        <Text
                            style={{
                                fontSize: Size.L,
                                fontFamily: Inter.medium,
                                color: Palette.gray[900]
                            }}
                        >
                            3
                        </Text>
                        <Text
                            style={{
                                fontSize: Size.S,
                                fontFamily: Inter.regular,
                                color: Palette.gray[400]
                            }}
                        >
                            /9
                        </Text>
                    </View>
                    <Text
                        style={{
                            fontFamily: Inter.regular,
                            color: Palette.gray[900]
                        }}
                    >
                        Round
                    </Text>
                </View>
            </View>
            <View style={{ padding: Size.BASE, gap: Size.L }}>
                <Section name="Match history">
                    <List>
                        {ACTIVITIES.map((a, i) => (
                            <PlayerResult key={i} {...a} />
                        ))}
                    </List>
                </Section>
                <Section
                    name="Standings"
                    action={{
                        name: "Show all",
                        onPress: () => router.push(`${pathname}/standings`)
                    }}
                >
                    <List type="compact">
                        {ACTIVITIES.map((a, i) => (
                            <Fragment key={a.player.firstName}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: Size.BASE,
                                        paddingRight: Size.M,
                                        backgroundColor: Palette.white
                                    }}
                                >
                                    <View
                                        style={{
                                            gap: Size.XXXS
                                        }}
                                    >
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: Size.XXS
                                            }}
                                        >
                                            <Text style={Typography.body}>
                                                {i + 1}. {a.opponent.firstName} {a.opponent.lastName}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: Size.XXS
                                            }}
                                        >
                                            <Badge theme="gray">OMW {a.omw.toFixed(2)}</Badge>
                                            <Badge theme="gray">GW {a.gw.toFixed(2)}</Badge>
                                            <Badge theme="gray">OGW {a.ogw.toFixed(2)}</Badge>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                                        <Text style={[Typography.body, { fontSize: Size.BASE }]}>{a.score}</Text>
                                    </View>
                                </View>
                                <Separator color={Palette.gray[100]} />
                            </Fragment>
                        ))}
                    </List>
                </Section>
            </View>
        </ScrollView>
    )
}
