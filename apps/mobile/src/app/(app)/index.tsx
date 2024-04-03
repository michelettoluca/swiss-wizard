import { View } from "react-native"
import { Colors, Size } from "../../styles"
import { Avatar, Section, Text } from "../../components"

export default function () {
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
                <Avatar color={Colors.emerald[400]} />
                <View>
                    <Text size="s">Welcome</Text>
                    <Text weight="semibold" color={Colors.gray[900]}>
                        San Pietro
                    </Text>
                </View>
            </View>
            <Section name="Section" action={{ name: "Show all", onPress: () => console.log("Palle") }}>
                <Text>asd</Text>
            </Section>
        </View>
    )
}
