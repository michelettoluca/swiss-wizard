import { PropsWithChildren } from "react"
import { ScrollView, Text, TextStyle, View } from "react-native"
import { Avatar } from "../../../components/avatar"
import { List } from "../../../components/list"
import { Section } from "../../../components/section"
import { Separator } from "../../../components/separator"
import { useUser } from "../../../contexts/user"
import { Palette } from "../../../styles/palette"
import { BASE, L, M, XXL } from "../../../styles/size"
import { Inter, Typography } from "../../../styles/typography"

const aa: TextStyle[] = [
    Typography.body,
    {
        color: Palette.gray[900]
    }
]

export default function () {
    const { user, clerkUser } = useUser()

    return (
        <ScrollView style={{ backgroundColor: Palette.gray[100] }}>
            <View style={{ gap: L, padding: BASE, paddingTop: XXL }}>
                <View style={{ alignItems: "center", gap: BASE, margin: "auto" }}>
                    <Avatar size={128} color={Palette.emerald[200]} />
                    <Text
                        style={{
                            fontFamily: Inter.semiBold,
                            fontSize: L,
                            color: Palette.gray[900]
                        }}
                    >
                        {clerkUser?.firstName} {clerkUser?.lastName}
                    </Text>
                </View>
                <List type={"compact"}>
                    <ListItem>
                        <Text style={Typography.body}>Username</Text>
                        <Text style={aa}>{user?.username}</Text>
                    </ListItem>
                    <Separator color={Palette.gray[100]} />
                    <ListItem>
                        <Text style={Typography.body}>???</Text>
                        <Text style={aa}>???</Text>
                    </ListItem>
                    <Separator color={Palette.gray[100]} />
                    <ListItem>
                        <Text style={Typography.body}>???</Text>
                        <Text style={aa}>???</Text>
                    </ListItem>
                </List>
                <Section name="Stats">
                    <List type={"compact"}>
                        <ListItem>
                            <Text style={Typography.body}>???</Text>
                            <Text style={aa}>???</Text>
                        </ListItem>
                        <Separator color={Palette.gray[100]} />
                        <ListItem>
                            <Text style={Typography.body}>???</Text>
                            <Text style={aa}>???</Text>
                        </ListItem>
                        <Text style={aa}>???</Text>
                        <ListItem>
                            <Text style={Typography.body}>???</Text>
                            <Text style={aa}>???</Text>
                        </ListItem>
                        <Separator color={Palette.gray[100]} />
                        <ListItem>
                            <Text style={Typography.body}>???</Text>
                            <Text style={aa}>???</Text>
                        </ListItem>
                        <Separator color={Palette.gray[100]} />
                        <ListItem>
                            <Text style={Typography.body}>???</Text>
                            <Text style={aa}>???</Text>
                        </ListItem>
                        <ListItem>
                            <Text style={Typography.body}>???</Text>
                            <Text style={aa}>???</Text>
                        </ListItem>
                        <ListItem>
                            <Text style={Typography.body}>???</Text>
                            <Text style={aa}>???</Text>
                        </ListItem>
                        <Separator color={Palette.gray[100]} />
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
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                padding: BASE,
                paddingRight: M,
                backgroundColor: Palette.white
            }}
        >
            {children}
        </View>
    )
}
