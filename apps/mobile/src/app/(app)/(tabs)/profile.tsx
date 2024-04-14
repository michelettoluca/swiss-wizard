import { PropsWithChildren } from "react"
import { ScrollView, View } from "react-native"
import { Avatar } from "../../../components/avatar"
import { List } from "../../../components/list"
import { Section } from "../../../components/section"
import { Separator } from "../../../components/separator"
import { Text } from "../../../components/text"
import { useUser } from "../../../contexts/user"
import { EMERALD, GRAY, WHITE } from "../../../styles/color"
import { BASE, L, M, XXL } from "../../../styles/size"

export default function () {
    const { user, clerkUser } = useUser()

    return (
        <ScrollView style={{ backgroundColor: GRAY[100] }}>
            <View style={{ display: "flex", gap: L, padding: BASE, paddingTop: XXL }}>
                <View style={{ display: "flex", alignItems: "center", gap: BASE, margin: "auto" }}>
                    <Avatar size={128} color={EMERALD[200]} />
                    <Text color={GRAY[900]} weight="semibold" size={L}>
                        {clerkUser?.firstName} {clerkUser?.lastName}
                    </Text>
                </View>
                <List type={"compact"}>
                    <ListItem>
                        <Text>Username</Text>
                        <Text color={GRAY[900]}>{user?.username}</Text>
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
                </List>
                <Section name="Stats">
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
        </ScrollView>
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
