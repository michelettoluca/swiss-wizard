import { View } from "react-native"
import { BLUE, GRAY, AMBER, WHITE } from "../../styles/color"
import { L, BASE, XXS, XS, M, XXXS } from "../../styles/size"
import { Avatar } from "../../components/avatar"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import { Section } from "../../components/section"
import { useUser } from "../../contexts/user"
import { PropsWithChildren } from "react"
import { Badge, BadgeTheme } from "../../components/badge"
import { List } from "../../components/list"
import { TournamentListItem } from "../../components/torunament-list-item"

const ACTIVITIES = [
    {
        name: "Evento 1",
        rank: 1,
        date: "15 gennaio 2024",
        opponent: { firstName: "Pietro", lastName: "Smusi" },
        wins: 2,
        losses: 1,
        omw: Math.random(),
        gw: Math.random(),
        ogw: Math.random()
    },
    {
        name: "Evento 2",
        rank: 5,
        date: "1 febbraio 2024",
        opponent: { firstName: "Orazio", lastName: "Grinzosi" },
        wins: 0,
        losses: 1,
        omw: Math.random(),
        gw: Math.random(),
        ogw: Math.random()
    },
    {
        name: "Evento 3",
        rank: 16,
        date: "7 aprile 2024",
        opponent: { firstName: "Silvio", lastName: "Berlusconi" },
        wins: 1,
        losses: 1,
        omw: Math.random(),
        gw: Math.random(),
        ogw: Math.random()
    }
] as const

export default function () {
    const { user, signOut } = useUser()

    return (
        <View style={{ display: "flex", gap: L, padding: BASE }}>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: XXS
                }}
            >
                <Avatar color={BLUE[400]} />
                <View>
                    <Text size="s">Welcome</Text>
                    <Text weight="semibold" color={GRAY[900]}>
                        {user.username!}
                    </Text>
                </View>
            </View>
            <Section name="Section" action={{ name: "Show all", onPress: () => console.log("Palle") }}>
                {/* <Text>asd</Text> */}
                <List type="compact">
                    {ACTIVITIES.map((a, i) => (
                        <>
                            <PlayerResult key={a.name} {...a} />
                            {i < ACTIVITIES.length - 1 && <Separator />}
                        </>
                    ))}
                </List>
            </Section>
            <Button onPress={() => signOut()}>Log out</Button>
        </View>
    )
}

type SeparatorProps = {}

function Separator({}: SeparatorProps) {
    return <View style={{ height: 1, backgroundColor: GRAY[100] }}></View>
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
                gap: XXS,
                padding: BASE,
                paddingRight: M,
                backgroundColor: WHITE
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
