import { PropsWithChildren } from "react"
import { View } from "react-native"
import { Avatar } from "../../components/avatar"
import { List } from "../../components/list"
import { Section } from "../../components/section"
import { Separator } from "../../components/separator"
import { Text } from "../../components/text"
import { EMERALD, GRAY, WHITE } from "../../styles/color"
import { BASE, L, M, XXL } from "../../styles/size"

const MOCK_PROFILE = {
    played: 3,
    winRate: Math.random() * 100,
    averageRank: Math.abs(Math.random() * 20)
} as const

export default function () {
    return (
        <View style={{ display: "flex", gap: L, paddingHorizontal: BASE, paddingVertical: XXL }}>
            <View style={{ display: "flex", alignItems: "center", gap: BASE, margin: "auto" }}>
                <Avatar size={128} color={EMERALD[200]} />
                <Text color={GRAY[900]} weight="semibold" size="l">
                    San Pietro
                </Text>
            </View>
            <List type={"compact"}>
                <ListItem>
                    <Text>Played</Text>
                    <Text color={GRAY[900]}>{MOCK_PROFILE.played}</Text>
                </ListItem>
                <Separator color={GRAY[100]} />
                <ListItem>
                    <Text>Win rate</Text>
                    <Text color={GRAY[900]}>{MOCK_PROFILE.winRate.toFixed(2)}%</Text>
                </ListItem>
                <Separator color={GRAY[100]} />
                <ListItem>
                    <Text>Average rank</Text>
                    <Text color={GRAY[900]}>{MOCK_PROFILE.averageRank.toFixed()}</Text>
                </ListItem>
            </List>
            <Section name="Statistics">
                <List type={"compact"}>
                    <ListItem>
                        <Text>???</Text>
                        <Text color={GRAY[900]}>???</Text>
                    </ListItem>
                    <Separator color={GRAY[100]} />
                    <ListItem>
                        <Text>???</Text>
                        <Text color={GRAY[900]}>???</Text>
                    </ListItem>
                    <Separator color={GRAY[100]} />
                    <ListItem>
                        <Text>???</Text>
                        <Text color={GRAY[900]}>???</Text>
                    </ListItem>
                    <Separator color={GRAY[100]} />
                    <ListItem>
                        <Text>???</Text>
                        <Text color={GRAY[900]}>???</Text>
                    </ListItem>
                    <Separator color={GRAY[100]} />
                    <ListItem>
                        <Text>???</Text>
                        <Text color={GRAY[900]}>???</Text>
                    </ListItem>
                    <ListItem>
                        <Text>???</Text>
                        <Text color={GRAY[900]}>???</Text>
                    </ListItem>
                    <ListItem>
                        <Text>???</Text>
                        <Text color={GRAY[900]}>???</Text>
                    </ListItem>
                    <Separator color={GRAY[100]} />
                </List>
            </Section>
        </View>
    )
}

function ListItem({ children }: PropsWithChildren) {
    return (
        <View
            style={{
                display: "flex",
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                padding: BASE,
                paddingRight: M,
                backgroundColor: WHITE
            }}
        >
            {children}
        </View>
    )
}
