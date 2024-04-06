import { StyleSheet, View } from "react-native"
import * as Color from "../../styles/color"
import * as Size from "../../styles/size"
import { Avatar } from "../../components/avatar"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import { Section } from "../../components/section"
import { useUser } from "../../contexts/user"
import { PropsWithChildren } from "react"

const ACTIVITIES = [
    { name: "Evento 1", rank: 1, date: "15 gennaio 2024" },
    { name: "Evento 2", rank: 5, date: "1 febbraio 2024" },
    { name: "Evento 3", rank: 16, date: "7 aprile 2024" }
] as const

export default function () {
    const { user, signOut } = useUser()

    return (
        <View style={{ display: "flex", gap: Size.l, padding: Size.base }}>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: Size.xxs
                }}
            >
                <Avatar color={Color.blue[400]} />
                <View>
                    <Text size="s">Welcome</Text>
                    <Text weight="semibold" color={Color.gray[900]}>
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
                gap: Size.xxs
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
                gap: Size.xs,
                padding: Size.base,
                backgroundColor: Color.white,
                borderRadius: Size.xs
            }}
        >
            <Avatar color={Color.amber[200]} />
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flexGrow: 1
                }}
            >
                <View>
                    <Text weight="medium" color={Color.gray[900]}>
                        {name}
                    </Text>
                    <Text size="s" color={Color.gray[400]}>
                        {date}
                    </Text>
                </View>
                <Text>{rank}°</Text>
            </View>
        </View>
    )
}
