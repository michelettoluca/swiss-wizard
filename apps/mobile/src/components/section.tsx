import { Pressable, View } from "react-native"
import { Text } from "./text"
import { Colors, Size } from "../styles"
import { ChevronRight } from "lucide-react-native"
import { PropsWithChildren } from "react"

type SectionProps = {
    name: string
    action?: {
        name: string
        onPress: () => void
    }
} & PropsWithChildren

export function Section({ name, action, children }: SectionProps) {
    return (
        <View>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "baseline"
                }}
            >
                <Text weight="semibold" color={Colors.gray[900]} size="m">
                    {name}
                </Text>
                {action && (
                    <Pressable
                        style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: Size.xxxs }}
                        onPress={action.onPress}
                    >
                        <Text size="s" weight="medium" color={Colors.blue[500]}>
                            {action.name}
                        </Text>
                        <ChevronRight height={20} width={20} color={Colors.blue[500]} />
                    </Pressable>
                )}
            </View>
            <View>{children}</View>
        </View>
    )
}
