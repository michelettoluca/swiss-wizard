import { View } from "react-native"
import * as Color from "../../styles/color"
import * as Size from "../../styles/size"
import { Avatar } from "../../components/avatar"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import { Section } from "../../components/section"
import { useUser } from "@clerk/clerk-expo"

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
                <Text>asd</Text>
            </Section>
            <Button onPress={() => signOut()}>Log out</Button>
        </View>
    )
}
