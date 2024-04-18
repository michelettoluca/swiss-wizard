import { ChevronRight } from "lucide-react-native"
import { PropsWithChildren } from "react"
import { Pressable, Text, View } from "react-native"
import { Palette } from "../styles/palette"
import { M, S, XS, XXXS } from "../styles/size"
import { Inter } from "../styles/typography"

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
                <Text
                    style={{
                        fontFamily: Inter.semiBold,
                        fontSize: M,
                        color: Palette.gray[900]
                    }}
                >
                    {name}
                </Text>
                {action && (
                    <Pressable
                        style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: XXXS }}
                        onPress={action.onPress}
                    >
                        <Text
                            style={{
                                fontFamily: Inter.medium,
                                fontSize: S,
                                color: Palette.blue[500]
                            }}
                        >
                            {action.name}
                        </Text>
                        <ChevronRight height={20} width={20} color={Palette.blue[500]} />
                    </Pressable>
                )}
            </View>
            <View>{children}</View>
        </View>
    )
}
