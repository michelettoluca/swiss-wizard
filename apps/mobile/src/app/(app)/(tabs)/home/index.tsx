import { Link } from "expo-router"
import { Handshake } from "lucide-react-native"
import { Pressable, ScrollView, Text, TextStyle, View } from "react-native"
import { Entities } from "server/src/prisma"
import { Avatar } from "../../../../components/avatar"
import { Badge, BadgeTheme } from "../../../../components/badge"
import { Button } from "../../../../components/button"
import { List } from "../../../../components/list"
import { Section } from "../../../../components/section"
import { UserProvider, useUser } from "../../../../contexts/user"
import { trpc } from "../../../../lib/trpc"
import { Palette } from "../../../../styles/palette"
import { BASE, L, M, S, XL, XS, XXL, XXS, XXXS } from "../../../../styles/size"
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
    const { user, clerkUser, signOut } = useUser()

    const { data: hostedTournaments } = trpc.tournament.findHosted.useQuery({
        id: user.id
    })

    return (
        <UserProvider>
            <ScrollView style={{ backgroundColor: Palette.gray[100] }}>
                <View style={{ gap: L, padding: BASE }}>
                    <View
                        style={{
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
                        <List>
                            {hostedTournaments?.map((tournament) => (
                                <HostedTournament key={tournament.id} tournament={tournament} />
                            ))}
                        </List>
                    </Section>
                    <View
                        style={{
                            alignItems: "flex-end"
                        }}
                    >
                        <Button onPress={() => signOut()}>
                            <Text
                                style={[
                                    Typography.body,
                                    {
                                        color: Palette.white
                                    }
                                ]}
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

type HostedTournamentProps = {
    tournament: Omit<Entities["Tournament"], "createdAt"> & { createdAt: string }
}

function HostedTournament({ tournament }: HostedTournamentProps) {
    return (
        <Link
            key={tournament.id}
            style={{
                padding: BASE,
                paddingRight: M,
                backgroundColor: Palette.white,
                borderRadius: XS
            }}
            href={`/(app)/home/torunament/${tournament.id}`}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: XS
                }}
            >
                <Avatar size={48} color={Palette.amber[200]} />
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            gap: XXXS,
                            marginBottom: XXXS
                        }}
                    >
                        <Text style={[Typography.body, { fontFamily: Inter.medium, color: Palette.gray[900] }]}>
                            {tournament.name}
                        </Text>
                        <Badge theme="gray">{tournament.status}</Badge>
                    </View>
                    <Text style={[Typography.body]}>{tournament.format}</Text>
                    <Text style={[Typography.body]}>{new Date(tournament.createdAt).toDateString()}</Text>
                </View>
            </View>
        </Link>
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
                    gap: XXS
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
            <View style={{ flexDirection: "row" }}>
                <Text style={Typography.body}>{wins}</Text>
                <Text style={[Typography.body, { color: Palette.gray[400] }]}> - </Text>
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
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: BASE,
                paddingRight: M,
                backgroundColor: Palette.white
            }}
        >
            <View style={{ gap: XXS }}>
                <View style={{ flexDirection: "row", gap: XXS }}>
                    <View>
                        <Text style={Typography.body}>{rank}.</Text>
                    </View>
                    <Text style={Typography.body}>
                        {player.firstName} {player.lastName}
                    </Text>
                </View>
                <View style={{ flexDirection: "row", gap: XXS }}>
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
    fontFamily: Inter.semiBold,
    color: Palette.gray[900]
}

function TournamentPreviews() {
    return (
        <View
            style={{
                gap: XXXS,
                padding: XXXS,
                backgroundColor: Palette.white,
                shadowColor: Palette.black,
                shadowOffset: {
                    width: 0,
                    height: 2
                },
                shadowOpacity: 1,
                shadowRadius: 10,
                borderRadius: XS,
                elevation: 3
            }}
        >
            <View
                style={{
                    backgroundColor: Palette.blue[50],
                    borderRadius: XXS,
                    padding: BASE,
                    gap: S,
                    minHeight: 256
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        gap: XXS
                    }}
                >
                    <Handshake size={24} stroke={Palette.gray[900]} />
                    <Text style={semiBoldBody}>Round 4</Text>
                </View>
                <View style={{ gap: XXXS }}>
                    <Text style={[Typography.body, { color: Palette.blue[900], lineHeight: BASE }]}>
                        Your opponent is
                    </Text>
                    <Text
                        style={{
                            fontFamily: Inter.bold,
                            fontSize: XL,
                            marginVertical: -8,
                            color: Palette.blue[900]
                        }}
                        adjustsFontSizeToFit={true}
                        numberOfLines={2}
                    >
                        Francesco Raso Due a consoles
                    </Text>
                    <Text style={[Typography.body, { color: Palette.blue[900], lineHeight: BASE }]}>
                        playing at <Text style={[semiBoldBody, { color: Palette.blue[900] }]}>table</Text> number
                    </Text>
                    <Text
                        style={{
                            fontFamily: Inter.bold,
                            fontSize: XL,
                            marginVertical: -8,
                            color: Palette.blue[900]
                        }}
                    >
                        12
                    </Text>
                </View>
                <Button style={{ alignSelf: "flex-end" }}>
                    <Text style={{ fontFamily: Inter.medium, color: Palette.white }}>Submit result</Text>
                </Button>
            </View>
            <View style={{ height: XXXS, flex: 1 }} />
            <View style={{ flexDirection: "row", gap: XXXS }}>
                <Pressable
                    style={{
                        flex: 1,
                        alignItems: "center",
                        backgroundColor: Palette.gray[100],
                        padding: XXS,
                        borderRadius: XXS
                    }}
                >
                    <Text
                        style={[
                            Typography.label,
                            { textTransform: "uppercase", fontSize: XS, fontFamily: Inter.semiBold, letterSpacing: 1 }
                        ]}
                    >
                        Joined
                    </Text>
                </Pressable>
                <Pressable
                    style={{
                        flex: 1,
                        alignItems: "center",
                        backgroundColor: Palette.gray[100],
                        padding: XXS,
                        borderRadius: XXS
                    }}
                >
                    <Text
                        style={[
                            Typography.label,
                            { textTransform: "uppercase", fontSize: XS, fontFamily: Inter.semiBold, letterSpacing: 1 }
                        ]}
                    >
                        Hosted
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}
