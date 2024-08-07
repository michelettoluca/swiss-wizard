import { Link, router } from "expo-router"
import { MoreVertical } from "lucide-react-native"
import { useEffect, useState } from "react"
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native"
import Animated, { useSharedValue, withSpring } from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Entities } from "server/src/prisma"
import { Avatar } from "../../components/avatar"
import { Badge } from "../../components/badge"
import { Button } from "../../components/button"
import { Carousel } from "../../components/carousel"
import { List } from "../../components/list"
import { Section } from "../../components/section"
import { useUser } from "../../contexts/user"
import { trpc } from "../../lib/trpc"
import { Palette } from "../../styles/palette"
import { Size } from "../../styles/size"
import { Inter, Typography } from "../../styles/typography"
import { TournamentPreview } from "../../components/tournament-preview"
import { TournamentListItem } from "../../components/torunament-list-item"

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
                        onPress={() => router.push("/tournament/create")}
                    >
                        <MoreVertical stroke={Palette.gray[900]} size={20} />
                    </Pressable>
                </View>

                <OngoingTournaments />

                <Section name="Standing" action={{ name: "Show all", onPress: () => console.log("Palle") }}>
                    <List>
                        {hostedTournaments?.map((torunament, i) => (
                            <TournamentListItem
                                key={torunament.id}
                                name={torunament.name}
                                rank={i + 1}
                                date={torunament.createdAt}
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

function OngoingTournaments() {
    const screen = Dimensions.get("screen")
    const width = screen.width - 12 * 2 - 2 * 4
    const marginRight = 4

    const offset = useSharedValue(14)

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
                <TournamentPreview href={"/tournament/123"} style={{ width, borderRadius: Size.XXS, minHeight: 256 }} />
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
