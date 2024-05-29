import { ChevronRight } from "lucide-react-native"
import { PropsWithChildren } from "react"
import { Pressable, Text, View } from "react-native"
import { Palette } from "../styles/palette"
import { Size } from "../styles/size"
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
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: Size.XS
                }}
            >
                <Text
                    style={{
                        fontFamily: Inter.semiBold,
                        fontSize: Size.M,
                        color: Palette.gray[900]
                    }}
                >
                    {name}
                </Text>
                {action && (
                    <Pressable
                        style={{ flexDirection: "row", alignItems: "center", gap: Size.XXXS }}
                        onPress={action.onPress}
                    >
                        <Text
                            style={{
                                fontFamily: Inter.medium,
                                fontSize: Size.S,
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
