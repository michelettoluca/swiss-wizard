import { Handshake } from "lucide-react-native"
import { Fragment } from "react"
import { ScrollView, Text, TextStyle, View } from "react-native"
import { Avatar } from "../../../components/avatar"
import { Badge, BadgeTheme } from "../../../components/badge"
import { Button } from "../../../components/button"
import { List } from "../../../components/list"
import { Section } from "../../../components/section"
import { Separator } from "../../../components/separator"
import { UserProvider, useUser } from "../../../contexts/user"
import { Palette } from "../../../styles/palette"
import { BASE, L, M, XL, XS, XXL, XXS, XXXS } from "../../../styles/size"
import { Inter, Typography } from "../../../styles/typography"

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
    const { clerkUser, signOut } = useUser()

    return (
        <UserProvider>
            <ScrollView style={{ backgroundColor: Palette.gray[100] }}>
                <View style={{ display: "flex", gap: L, padding: BASE }}>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: XXS
                        }}
                    >
                        <Avatar size={XXL} color={Palette.blue[400]} />
                        <View>
                            <Text style={Typography.label}>Welcome</Text>
                            <Text style={Typography.header}>
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
                                    <Separator color={Palette.gray[100]} />
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
                            <Text
                                style={{
                                    ...Typography.body,
                                    color: Palette.white
                                }}
                            >
                                Log out
                            </Text>
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
                backgroundColor: Palette.white,
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
                    <Text style={Typography.body}>
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
                <Text style={Typography.body}>{wins}</Text>
                <Text style={{ ...Typography.body, color: Palette.gray[400] }}> - </Text>
                <Text style={Typography.body}>{losses}</Text>
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
                backgroundColor: Palette.white
            }}
        >
            <View style={{ display: "flex", gap: XXS }}>
                <View style={{ display: "flex", flexDirection: "row", gap: XXS }}>
                    <View>
                        <Text style={Typography.body}>{rank}.</Text>
                    </View>
                    <Text style={Typography.body}>
                        {player.firstName} {player.lastName}
                    </Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", gap: XXS }}>
                    <Badge theme="gray">OMW {omw.toFixed(2)}</Badge>
                    <Badge theme="gray">GW {gw.toFixed(2)}</Badge>
                    <Badge theme="gray">OGW {ogw.toFixed(2)}</Badge>
                </View>
            </View>
            <Text style={Typography.body}>{score}</Text>
        </View>
    )
}

const semiBoldBody: TextStyle = {
    ...Typography.body,
    fontFamily: Inter.semiBold
}

function TournamentPreviews() {
    return (
        <View
            style={{
                display: "flex",
                padding: XXXS,
                backgroundColor: Palette.white,
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
                    backgroundColor: Palette.blue[50],
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
                    <Handshake size={24} stroke={Palette.gray[900]} />
                    <Text style={semiBoldBody}>Match ended</Text>
                </View>
                <View>
                    <Text style={Typography.body}>
                        <Text style={{ ...semiBoldBody, color: Palette.gray[600] }}>Round 4</Text> has begun, your
                        opponent is
                    </Text>
                    <Text
                        style={{
                            fontFamily: Inter.bold,
                            fontSize: XL,
                            color: Palette.gray[900]
                        }}
                        numberOfLines={2}
                    >
                        Francesco Raso Stoia
                    </Text>
                    <Text style={Typography.body}>
                        playing at <Text style={{ ...semiBoldBody, color: Palette.gray[900] }}>table</Text> number
                    </Text>
                    <Text
                        style={{
                            fontFamily: Inter.bold,
                            fontSize: XL,
                            color: Palette.gray[900]
                        }}
                    >
                        12
                    </Text>
                </View>
            </View>
        </View>
    )
}
