import { Pressable, View } from "react-native"
import { Text } from "./text"
import { GRAY, BLUE } from "../styles/color"
import { XS, XXXS } from "../styles/size"
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
                    alignItems: "baseline",
                    marginBottom: XS
                }}
            >
                <Text weight="semibold" color={GRAY[900]} size="m">
                    {name}
                </Text>
                {action && (
                    <Pressable
                        style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: XXXS }}
                        onPress={action.onPress}
                    >
                        <Text size="s" weight="medium" color={BLUE[500]}>
                            {action.name}
                        </Text>
                        <ChevronRight height={20} width={20} color={BLUE[500]} />
                    </Pressable>
                )}
            </View>
            <View>{children}</View>
        </View>
    )
}
