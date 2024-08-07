import { usePathname, useRouter } from "expo-router"
import { Text, View } from "react-native"
import { List } from "../../../../components/list"
import { PlayerResult } from "../../../../components/result"
import { Section } from "../../../../components/section"
import { Palette } from "../../../../styles/palette"
import { Size } from "../../../../styles/size"
import { Inter } from "../../../../styles/typography"
import { TournamentPreview } from "../../../../components/tournament-preview"
import { Standings } from "../../../../components/standings"
import { Page } from "../../../../components/page"

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
]

export default function () {
    // const { id } = useLocalSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    // const { data: tournament } = trpc.tournament.findById.useQuery({ id: Number(id) }, { enabled: !!id })

    return (
        <Page backgroundColor={Palette.blue[100]} color={Palette.blue[900]} title={"Tappa #1"}>
            <TournamentPreview
                style={{
                    paddingHorizontal: Size.L,
                    paddingBottom: Size.XXXL + Size.XXL
                }}
            />
            <View
                style={{
                    flexDirection: "row",
                    height: 80,
                    marginHorizontal: Size.XS,
                    borderRadius: Size.XS,
                    backgroundColor: Palette.white,
                    marginTop: -Size.L
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
            <View style={{ padding: Size.XS, gap: Size.L }}>
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
                    <Standings standings={ACTIVITIES} />
                </Section>
            </View>
        </Page>
    )
}
