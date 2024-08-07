import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils"
import { useRouter } from "expo-router"
import { Pressable, StyleSheet, Text, TextStyle, View } from "react-native"
import { Palette } from "../styles/palette"
import { Size } from "../styles/size"
import { ArrowUpRight, Hourglass } from "lucide-react-native"
import { Inter, Typography } from "../styles/typography"

const semiBoldBody: TextStyle = {
    ...Typography.body,
    fontFamily: Inter.semiBold,
    color: Palette.blue[900]
}

type TournamentPreviewProps = {
    href?: string
} & ViewProps

export function TournamentPreview({ href, style }: TournamentPreviewProps) {
    const router = useRouter()

    function handlePress() {
        if (href) {
            router.push(href)
        }
    }

    return (
        <Pressable
            style={StyleSheet.flatten([
                {
                    backgroundColor: Palette.blue[100],
                    padding: Size.BASE,
                    borderRightColor: Palette.blue[200],
                    gap: Size.S
                },
                style
            ])}
            onPress={handlePress}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: Size.XXXS
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: Size.XXXS
                    }}
                >
                    <Hourglass size={24} stroke={Palette.blue[900]} />
                    <Text style={semiBoldBody}>43:20</Text>
                </View>
                {href && <ArrowUpRight size={24} stroke={Palette.blue[900]} />}
            </View>
            <View style={{ gap: Size.XXS }}>
                <Text style={[Typography.body, { color: Palette.blue[900], lineHeight: Size.BASE }]}>
                    Round 4 is about to begin, {"\n"}your opponent is
                </Text>
                <Text
                    style={{
                        fontFamily: Inter.semiBold,
                        fontSize: 30,
                        lineHeight: 30,
                        color: Palette.blue[900]
                    }}
                    adjustsFontSizeToFit={true}
                    numberOfLines={2}
                >
                    Salvatore Aranzulla
                </Text>
                <Text style={[Typography.body, { color: Palette.blue[900], lineHeight: Size.BASE }]}>
                    playing at <Text style={[semiBoldBody, { color: Palette.blue[900] }]}>table</Text> number
                </Text>
                <Text
                    style={{
                        fontFamily: Inter.semiBold,
                        fontSize: 30,
                        lineHeight: 30,
                        color: Palette.blue[900]
                    }}
                >
                    12
                </Text>
            </View>
        </Pressable>
    )
}
