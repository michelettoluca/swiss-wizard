import { PropsWithChildren } from "react"
import { ScrollView, View } from "react-native"
import { Avatar } from "../../components/avatar"
import { List } from "../../components/list"
import { Section } from "../../components/section"
import { Separator } from "../../components/separator"
import { Text } from "../../components/text"
import { EMERALD, GRAY, WHITE } from "../../styles/color"
import { BASE, L, M, XXL, XXXL } from "../../styles/size"

export default function () {
    return (
        <ScrollView style={{ backgroundColor: GRAY[100], marginBottom: XXXL }}>
            <View style={{ display: "flex", gap: L, padding: BASE, paddingTop: XXL }}>
                <View style={{ display: "flex", alignItems: "center", gap: BASE, margin: "auto" }}>
                    <Avatar size={128} color={EMERALD[200]} />
                    <Text color={GRAY[900]} weight="semibold" size={L}>
                        San Pietro
                    </Text>
                </View>
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
