import { View } from "react-native"
import { Colors, Size } from "../../styles"
import { Avatar, Button, Section, Text } from "../../components"
import { useUser } from "../../contexts"

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
                <Avatar color={Colors.blue[400]} />
                <View>
                    <Text size="s">Welcome</Text>
                    <Text weight="semibold" color={Colors.gray[900]}>
                        {user.username!}
                    </Text>
                </View>
            </View>
            <Section name="Section" action={{ name: "Show all", onPress: () => console.log("Palle") }}>
                <Text>asd</Text>
            </Section>
            <Button onPress={() => signOut()}>Log out</Button>
        </View>
    )
}
