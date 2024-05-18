import { ScrollView, Text, View } from "react-native"
import { TournamentPreview } from "."
import { Badge, BadgeTheme } from "../../components/badge"
import { List } from "../../components/list"
import { Section } from "../../components/section"
import { Separator } from "../../components/separator"
import { Palette } from "../../styles/palette"
import { BASE, L, M, S, XS, XXS, XXXS } from "../../styles/size"
import { Inter, Typography } from "../../styles/typography"

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
                                fontSize: L,
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
                                fontSize: L,
                                fontFamily: Inter.medium,
                                color: Palette.gray[900]
                            }}
                        >
                            2
                        </Text>
                        <Text
                            style={{
                                fontSize: S,
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
                                fontSize: L,
                                fontFamily: Inter.medium,
                                color: Palette.gray[900]
                            }}
                        >
                            3
                        </Text>
                        <Text
                            style={{
                                fontSize: S,
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
            <View style={{ padding: BASE, gap: L }}>
                <Section name="Match history">
                    <List>
                        {ACTIVITIES.map((a, i) => (
                            <PlayerResult key={i} {...a} />
                        ))}
                    </List>
                </Section>
                <Section name="Standings">
                    <List type="compact">
                        {ACTIVITIES.map((a, i) => (
                            <>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: BASE,
                                        paddingRight: M,
                                        backgroundColor: Palette.white
                                    }}
                                >
                                    <View
                                        style={{
                                            gap: XXXS
                                        }}
                                    >
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: XXS
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
                                                gap: XXS
                                            }}
                                        >
                                            <Badge theme="gray">OMW {a.omw.toFixed(2)}</Badge>
                                            <Badge theme="gray">GW {a.gw.toFixed(2)}</Badge>
                                            <Badge theme="gray">OGW {a.ogw.toFixed(2)}</Badge>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                                        <Text style={[Typography.body, { fontSize: BASE }]}>{a.score}</Text>
                                    </View>
                                </View>
                                <Separator color={Palette.gray[100]} />
                            </>
                        ))}
                    </List>
                </Section>
            </View>
        </ScrollView>
    )
}

type PlayerResultProps = {
    opponent: {
        firstName: string
        lastName: string
    }
    wins: number
    losses: number
    omw: number
    gw: number
    ogw: number
}

function PlayerResult({ opponent, wins, losses, omw, gw, ogw }: PlayerResultProps) {
    let badgeTheme: BadgeTheme
    let badgeContent: string

    if (wins > losses) {
        badgeTheme = "emerald"
        badgeContent = "W"
    } else if (wins < losses) {
        badgeTheme = "red"
        badgeContent = "L"
    } else {
        badgeTheme = "amber"
        badgeContent = "D"
    }

    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: BASE,
                paddingRight: M,
                backgroundColor: Palette.white,
                borderRadius: XS
            }}
        >
            <View
                style={{
                    gap: XXXS
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: XXS
                    }}
                >
                    <Badge theme={badgeTheme}>{badgeContent}</Badge>
                    <Text style={Typography.body}>
                        {opponent.firstName} {opponent.lastName}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: XXS
                    }}
                >
                    <Badge theme="gray">OMW {omw.toFixed(2)}</Badge>
                    <Badge theme="gray">GW {gw.toFixed(2)}</Badge>
                    <Badge theme="gray">OGW {ogw.toFixed(2)}</Badge>
                </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                <Text style={[Typography.body, { fontSize: BASE }]}>{wins}</Text>
                <Text style={[Typography.body, { color: Palette.gray[400] }]}> - </Text>
                <Text style={[Typography.body, { fontSize: BASE }]}>{losses}</Text>
            </View>
        </View>
    )
}
