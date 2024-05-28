import { Link } from "expo-router"
import { ArrowUpRight, ChevronLeft, ChevronRight, Hourglass, MoreVertical } from "lucide-react-native"
import { Children, PropsWithChildren, useEffect, useRef, useState } from "react"
import { Dimensions, Pressable, PressableProps, ScrollView, StyleSheet, Text, TextStyle, View } from "react-native"
import Animated, { useSharedValue, withSpring } from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Entities } from "server/src/prisma"
import { Avatar } from "../../components/avatar"
import { Badge } from "../../components/badge"
import { Button } from "../../components/button"
import { List } from "../../components/list"
import { PlayerResult } from "../../components/result"
import { Section } from "../../components/section"
import { UserProvider, useUser } from "../../contexts/user"
import { trpc } from "../../lib/trpc"
import { Palette } from "../../styles/palette"
import { BASE, L, M, S, XS, XXL, XXS, XXXS } from "../../styles/size"
import { Inter, Typography } from "../../styles/typography"

export default function () {
    const insets = useSafeAreaInsets()
    const { user, clerkUser, signOut } = useUser()

    const { data: hostedTournaments } = trpc.tournament.findHosted.useQuery({
        id: user.id
    })

    return (
        <UserProvider>
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
                <View style={{ gap: L, padding: 12 }}>
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
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: Palette.white,
                                height: 40,
                                width: 40,
                                borderRadius: XS
                            }}
                        >
                            <MoreVertical stroke={Palette.gray[900]} size={20} />
                        </View>
                    </View>
                    <TournamentPreviewContainer />
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
    color: Palette.blue[900]
}

function TournamentPreviewContainer() {
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
                gap: XXXS,
                backgroundColor: Palette.white,
                shadowColor: Palette.black,
                shadowOffset: {
                    width: 0,
                    height: 2
                },
                borderWidth: XXXS,
                borderColor: Palette.white,
                shadowOpacity: 1,
                shadowRadius: 10,
                borderRadius: XS,
                elevation: 1,
                overflow: "hidden"
            }}
        >
            {selectedSection === "joined" && <TournamentPreview style={{ width }} />}
            {selectedSection === "hosted" && (
                <Pallini offset={width + marginRight}>
                    <TournamentPreview style={{ marginRight, width }} />
                    <TournamentPreview style={{ marginRight, width }} />
                    <TournamentPreview style={{ marginRight, width }} />
                </Pallini>
            )}
            <View
                style={{
                    flexDirection: "row",
                    gap: XXXS,
                    backgroundColor: Palette.gray[100],
                    padding: XXXS,
                    borderRadius: XXS
                }}
            >
                <Animated.View
                    style={{
                        position: "absolute",
                        left: offset,
                        top: 4,
                        bottom: 4,
                        width: (screen.width - 12 * 2 - 4 * 2 - 4 * 2) / 2,
                        backgroundColor: Palette.white,
                        borderRadius: XXS
                    }}
                />
                <Pressable
                    style={{
                        flex: 1,
                        alignItems: "center",
                        padding: XXS,
                        borderRadius: XXS
                    }}
                    onPress={() => setSelectedSection("joined")}
                >
                    <Text
                        style={[
                            Typography.label,
                            {
                                fontSize: S,
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
                        padding: XXS,
                        borderRadius: XXS
                    }}
                    onPress={() => setSelectedSection("hosted")}
                >
                    <Text
                        style={[
                            Typography.label,
                            {
                                fontSize: S,
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

export function TournamentPreview({ style }: any) {
    return (
        <View
            style={[
                {
                    backgroundColor: Palette.blue[100],
                    padding: BASE,
                    borderRightColor: Palette.blue[200],
                    gap: S,
                    minHeight: 256,
                    borderRadius: XXS
                },
                style
            ]}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: XXXS
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: XXXS
                    }}
                >
                    <Hourglass size={24} stroke={Palette.blue[900]} />
                    <Text style={semiBoldBody}>43:20</Text>
                </View>
                <ArrowUpRight size={24} stroke={Palette.blue[900]} />
            </View>
            <View style={{ gap: XXS }}>
                <Text style={[Typography.body, { color: Palette.blue[900], lineHeight: BASE }]}>
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
                <Text style={[Typography.body, { color: Palette.blue[900], lineHeight: BASE }]}>
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

type PalliniProps = {
    offset: number
} & PropsWithChildren

function NavButton({ style, ...props }: PressableProps) {
    return (
        <Pressable
            style={StyleSheet.flatten([
                {
                    position: "absolute",
                    top: "50%",
                    transform: [
                        {
                            translateY: -16
                        }
                    ],
                    height: 32,
                    width: 32,
                    backgroundColor: Palette.white,
                    borderRadius: 32,
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                    opacity: 0.8
                },
                style
            ])}
            {...props}
        />
    )
}

function Pallini({ children, offset }: PalliniProps) {
    const scrollViewRef = useRef<ScrollView>(null)
    const [pageIndex, setPageIndex] = useState<number>(0)

    useEffect(() => {
        scrollViewRef.current?.scrollTo({ x: offset * pageIndex })
    }, [pageIndex])

    const childrenCount = Children.count(children)

    return (
        <View
            style={{
                borderRadius: 8,
                overflow: "hidden"
            }}
        >
            {pageIndex > 0 && (
                <NavButton
                    style={{
                        left: 8
                    }}
                    onPress={() => setPageIndex(Math.max(pageIndex - 1, 0))}
                >
                    <ChevronLeft size={20} stroke={Palette.gray[500]} />
                </NavButton>
            )}
            {pageIndex < childrenCount - 1 && (
                <NavButton
                    style={{
                        right: 8
                    }}
                    onPress={() => setPageIndex(Math.min(pageIndex + 1, childrenCount - 1))}
                >
                    <ChevronRight size={20} stroke={Palette.gray[500]} />
                </NavButton>
            )}
            <View
                style={{
                    position: "absolute",
                    flexDirection: "row",
                    bottom: 8,
                    gap: 8,
                    left: "50%",
                    transform: [{ translateX: -Children.count(children) * 8 }],
                    borderBlockColor: "red",
                    zIndex: 10
                }}
            >
                {Children.map(children, (_, i) => (
                    <View
                        style={{
                            height: 8,
                            width: 8,
                            borderRadius: 8,
                            backgroundColor: Palette.white,
                            opacity: i === pageIndex ? 1 : 0.3
                        }}
                    />
                ))}
            </View>
            <ScrollView
                ref={scrollViewRef}
                scrollEnabled={false}
                horizontal
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled={false}
            >
                {children}
            </ScrollView>
        </View>
    )
}
