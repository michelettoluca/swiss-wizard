import { Link } from "expo-router"
import { ArrowUpRight, Hourglass, MoreVertical } from "lucide-react-native"
import { useEffect, useState } from "react"
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, TextStyle, View } from "react-native"
import Animated, { useSharedValue, withSpring } from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils"
import { Entities } from "server/src/prisma"
import { Avatar } from "../../components/avatar"
import { Badge } from "../../components/badge"
import { Button } from "../../components/button"
import { Carousel } from "../../components/carousel"
import { List } from "../../components/list"
import { PlayerResult } from "../../components/result"
import { Section } from "../../components/section"
import { useUser } from "../../contexts/user"
import { trpc } from "../../lib/trpc"
import { Palette } from "../../styles/palette"
import { Size } from "../../styles/size"
import { Inter, Typography } from "../../styles/typography"

export default function () {
    const insets = useSafeAreaInsets()
    const { user, clerkUser, signOut } = useUser()

    const { data: hostedTournaments } = trpc.tournament.findHosted.useQuery({
        id: user.id
    })

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                backgroundColor: Palette.gray[100],
                paddingTop: insets.top,
                paddingLeft: insets.left,
                paddingBottom: insets.bottom,
                paddingRight: insets.right
            }}
        >
            <View style={{ gap: Size.L, padding: Size.XS }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: Size.XXS
                        }}
                    >
                        <Avatar size={Size.XXL} color={Palette.blue[400]} />
                        <View>
                            <Text style={Typography.label}>Welcome</Text>
                            <Text style={Typography.header}>
                                {clerkUser?.firstName} {clerkUser?.lastName}
                            </Text>
                        </View>
                    </View>
                    <Pressable
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: Palette.white,
                            height: 40,
                            width: 40,
                            borderRadius: Size.XS
                        }}
                    >
                        <MoreVertical stroke={Palette.gray[900]} size={20} />
                    </Pressable>
                </View>

                <OngoingTournaments />

                <Section name="Standing" action={{ name: "Show all", onPress: () => console.log("Palle") }}>
                    <List>
                        {hostedTournaments?.map((tournament) => (
                            <PlayerResult
                                key={tournament.id}
                                gw={1}
                                ogw={1}
                                omw={1}
                                losses={Math.random() > 0.5 ? 1 : 0}
                                wins={Math.random() > 0.5 ? 1 : 0}
                                opponent={{ firstName: "Luca", lastName: "Micheletto" }}
                            />
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
                padding: Size.BASE,
                paddingRight: Size.M,
                backgroundColor: Palette.white,
                borderRadius: Size.XS
            }}
            href={`/(app)/home/torunament/${tournament.id}`}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: Size.XS
                }}
            >
                <Avatar size={48} color={Palette.amber[200]} />
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            gap: Size.XXXS,
                            marginBottom: Size.XXXS
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

const semiBoldBody: TextStyle = {
    ...Typography.body,
    fontFamily: Inter.semiBold,
    color: Palette.blue[900]
}

function OngoingTournaments() {
    const screen = Dimensions.get("screen")
    const width = screen.width - 12 * 2 - 2 * 4
    const marginRight = 4

    const offset = useSharedValue(4)

    const [selectedSection, setSelectedSection] = useState<"joined" | "hosted">("joined")

    useEffect(() => {
        if (selectedSection === "joined") {
            offset.value = withSpring(4, {
                damping: 100,
                stiffness: 250
            })
        } else if (selectedSection === "hosted") {
            offset.value = withSpring(4 + (screen.width - 12 * 2 - 4 * 2 - 4 * 2) / 2, {
                damping: 100,
                stiffness: 250
            })
        }
    }, [selectedSection])

    return (
        <View
            style={{
                gap: Size.XXXS,
                backgroundColor: Palette.white,
                shadowColor: Palette.black,
                shadowOffset: {
                    width: 0,
                    height: 2
                },
                borderWidth: Size.XXXS,
                borderColor: Palette.white,
                shadowOpacity: 1,
                shadowRadius: 10,
                borderRadius: Size.XS,
                elevation: 1
            }}
        >
            {selectedSection === "joined" && (
                <Link href={"/tournament/create"} asChild>
                    <Pressable>
                        <TournamentPreview style={{ width, borderRadius: Size.XXS, minHeight: 256 }} />
                    </Pressable>
                </Link>
            )}
            {selectedSection === "hosted" && (
                <Carousel offset={width + marginRight} style={{ minHeight: 256 }}>
                    <TournamentPreview style={{ marginRight, width, borderRadius: Size.XXS }} />
                    <TournamentPreview style={{ marginRight, width, borderRadius: Size.XXS }} />
                    <TournamentPreview style={{ marginRight, width, borderRadius: Size.XXS }} />
                </Carousel>
            )}
            <View
                style={{
                    flexDirection: "row",
                    gap: Size.XXXS,
                    backgroundColor: Palette.gray[100],
                    padding: Size.XXXS,
                    borderRadius: Size.XXS
                }}
            >
                <Animated.View
                    style={{
                        position: "absolute",
                        left: offset,
                        top: 4,
                        bottom: 4,
                        width: (screen.width - Size.XS * 2 - Size.XXXS * 2 - Size.XXXS * 2) / 2,
                        backgroundColor: Palette.white,
                        borderRadius: Size.XXS
                    }}
                />
                <Pressable
                    style={{
                        flex: 1,
                        alignItems: "center",
                        padding: Size.XXS,
                        borderRadius: Size.XXS
                    }}
                    onPress={() => setSelectedSection("joined")}
                >
                    <Text
                        style={[
                            Typography.label,
                            {
                                fontSize: Size.S,
                                fontFamily: Inter.regular,
                                color: Palette.gray[selectedSection === "joined" ? 600 : 400],
                                letterSpacing: 0.2
                            }
                        ]}
                    >
                        Joined
                    </Text>
                </Pressable>
                <Pressable
                    style={{
                        flex: 1,
                        alignItems: "center",
                        padding: Size.XXS,
                        borderRadius: Size.XXS
                    }}
                    onPress={() => setSelectedSection("hosted")}
                >
                    <Text
                        style={[
                            Typography.label,
                            {
                                fontSize: Size.S,
                                fontFamily: Inter.regular,
                                color: Palette.gray[selectedSection === "hosted" ? 600 : 400],
                                letterSpacing: 0.2
                            }
                        ]}
                    >
                        Hosted
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

export function TournamentPreview({ style }: ViewProps) {
    return (
        <View
            style={StyleSheet.flatten([
                {
                    backgroundColor: Palette.blue[100],
                    padding: Size.BASE,
                    borderRightColor: Palette.blue[200],
                    gap: Size.S
                },
                style
            ])}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: Size.XXXS
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: Size.XXXS
                    }}
                >
                    <Hourglass size={24} stroke={Palette.blue[900]} />
                    <Text style={semiBoldBody}>43:20</Text>
                </View>
                <ArrowUpRight size={24} stroke={Palette.blue[900]} />
            </View>
            <View style={{ gap: Size.XXS }}>
                <Text style={[Typography.body, { color: Palette.blue[900], lineHeight: Size.BASE }]}>
                    Round 4 is about to begin, {"\n"}your opponent is
                </Text>
                <Text
                    style={{
                        fontFamily: Inter.semiBold,
                        fontSize: 30,
                        lineHeight: 30,
                        color: Palette.blue[900]
                    }}
                    adjustsFontSizeToFit={true}
                    numberOfLines={2}
                >
                    Salvatore Aranzulla
                </Text>
                <Text style={[Typography.body, { color: Palette.blue[900], lineHeight: Size.BASE }]}>
                    playing at <Text style={[semiBoldBody, { color: Palette.blue[900] }]}>table</Text> number
                </Text>
                <Text
                    style={{
                        fontFamily: Inter.semiBold,
                        fontSize: 30,
                        lineHeight: 30,
                        color: Palette.blue[900]
                    }}
                >
                    12
                </Text>
            </View>
        </View>
    )
}
