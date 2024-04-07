import { View } from "react-native"
import { BLUE, GRAY, AMBER, WHITE } from "../../styles/color"
import { L, BASE, XXS, XS } from "../../styles/size"
import { Avatar } from "../../components/avatar"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import { Section } from "../../components/section"
import { useUser } from "../../contexts/user"
import { PropsWithChildren } from "react"
import { Badge } from "../../components/badge"

const ACTIVITIES = [
    { name: "Evento 1", rank: 1, date: "15 gennaio 2024" },
    { name: "Evento 2", rank: 5, date: "1 febbraio 2024" },
    { name: "Evento 3", rank: 16, date: "7 aprile 2024" }
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
                <Activity>
                    {ACTIVITIES.map((a) => (
                        <ActivityItem key={a.name} {...a} />
                    ))}
                </Activity>
            </Section>
            <Button onPress={() => signOut()}>Log out</Button>
        </View>
    )
}

function Activity({ children }: PropsWithChildren) {
    return (
        <View
            style={{
                display: "flex",
                gap: XXS
            }}
        >
            {children}
        </View>
    )
}

type ActivityItemProps = {
    name: string
    rank: number
    date: string
} & PropsWithChildren

function ActivityItem({ date, name, rank }: ActivityItemProps) {
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                gap: XS,
                padding: BASE,
                backgroundColor: WHITE,
                borderRadius: XS
            }}
        >
            <Avatar color={AMBER[200]} />
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flexGrow: 1
                }}
            >
                <View>
                    <Text weight="medium" color={GRAY[900]}>
                        {name}
                    </Text>
                    <View style={{ display: "flex", gap: 4 }}>
                        <Badge theme="emerald">W</Badge>
                        <Badge theme="red">L</Badge>
                        <Badge theme="amber">D</Badge>
                        <Badge theme="gray">OMW 0.81</Badge>
                    </View>
                    <Text size="s" color={GRAY[400]}>
                        {date}
                    </Text>
                </View>
                <Text>{rank}°</Text>
            </View>
        </View>
    )
}
