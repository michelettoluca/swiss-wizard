import { Handshake } from "lucide-react-native"
import { Fragment, useState } from "react"
import { ScrollView, View } from "react-native"
import { Avatar } from "../../../components/avatar"
import { Badge, BadgeTheme } from "../../../components/badge"
import { Button } from "../../../components/button"
import { List } from "../../../components/list"
import { Section } from "../../../components/section"
import { Separator } from "../../../components/separator"
import { Text } from "../../../components/text"
import { UserProvider, useUser } from "../../../contexts/user"
import { BLUE, GRAY, WHITE } from "../../../styles/color"
import { BASE, L, M, S, XL, XS, XXL, XXS, XXXS } from "../../../styles/size"

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
    const [a, setA] = useState<string>("")
    const { clerkUser, signOut } = useUser()

    return (
        <UserProvider>
            <ScrollView style={{ backgroundColor: GRAY[100] }}>
                <View style={{ display: "flex", gap: L, padding: BASE }}>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: XXS
                        }}
                    >
                        <Avatar size={XXL} color={BLUE[400]} />
                        <View>
                            <Text size={S}>Welcome</Text>
                            <Text weight="semibold" size={BASE} color={GRAY[900]}>
                                {clerkUser?.firstName} {clerkUser?.lastName}
                            </Text>
                        </View>
                    </View>
                    <TournamentPreviews />
                    <Section name="Match history">
                        <List>
                            {ACTIVITIES.map((a, i) => (
                                <PlayerResult key={i} {...a} />
                            ))}
                        </List>
                    </Section>
                    <Section name="Standing" action={{ name: "Show all", onPress: () => console.log("Palle") }}>
                        <List type="compact">
                            {ACTIVITIES.map((a, i) => (
                                <Fragment key={a.opponent.lastName}>
                                    <Standing {...a} rank={i + 1} />
                                    <Separator color={GRAY[100]} />
                                </Fragment>
                            ))}
                        </List>
                    </Section>
                    <View
                        style={{
                            display: "flex",
                            alignItems: "flex-end"
                        }}
                    >
                        <Button onPress={() => signOut()}>
                            <Text color={WHITE}>Log out</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </UserProvider>
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
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: BASE,
                paddingRight: M,
                backgroundColor: WHITE,
                borderRadius: XS
            }}
        >
            <View
                style={{
                    display: "flex",
                    gap: XXS
                }}
            >
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: XXS
                    }}
                >
                    <Badge theme={badgeTheme}>{badgeContent}</Badge>
                    <Text>
                        {opponent.firstName} {opponent.lastName}
                    </Text>
                </View>
                <View
                    style={{
                        display: "flex",
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
            <View style={{ display: "flex", flexDirection: "row" }}>
                <Text>{wins}</Text>
                <Text color={GRAY[400]}> - </Text>
                <Text>{losses}</Text>
            </View>
        </View>
    )
}

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
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: BASE,
                paddingRight: M,
                backgroundColor: WHITE
            }}
        >
            <View style={{ display: "flex", gap: XXS }}>
                <View style={{ display: "flex", flexDirection: "row", gap: XXS }}>
                    <View>
                        <Text>{rank}.</Text>
                    </View>
                    <Text>
                        {player.firstName} {player.lastName}
                    </Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", gap: XXS }}>
                    <Badge theme="gray">OMW {omw.toFixed(2)}</Badge>
                    <Badge theme="gray">GW {gw.toFixed(2)}</Badge>
                    <Badge theme="gray">OGW {ogw.toFixed(2)}</Badge>
                </View>
            </View>
            <Text>{score}</Text>
        </View>
    )
}

function TournamentPreviews() {
    return (
        <View
            style={{
                display: "flex",
                padding: XXXS,
                backgroundColor: WHITE,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2
                },
                borderRadius: XS,
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 3
            }}
        >
            <View
                style={{
                    display: "flex",
                    gap: BASE,
                    backgroundColor: BLUE[50],
                    borderRadius: XXS,
                    padding: BASE,
                    minHeight: 256
                }}
            >
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: XXS
                    }}
                >
                    <Handshake size={24} stroke={GRAY[900]} />
                    <Text weight="semibold" color={GRAY[900]}>
                        Match ended
                    </Text>
                </View>
                <View>
                    <Text color={GRAY[900]}>
                        <Text weight="semibold" color={GRAY[900]}>
                            Round 4
                        </Text>{" "}
                        has begun, your opponent is
                    </Text>
                    <Text numberOfLines={2} size={XL} weight="bold" color={GRAY[900]}>
                        Francesco Raso Stoia
                    </Text>
                    <Text color={GRAY[900]}>
                        playing at{" "}
                        <Text weight="semibold" color={GRAY[900]}>
                            table
                        </Text>{" "}
                        number
                    </Text>
                    <Text size={XL} weight="bold" color={GRAY[900]}>
                        12
                    </Text>
                </View>
            </View>
        </View>
    )
}
