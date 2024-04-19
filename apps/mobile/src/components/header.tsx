import { useRouter } from "expo-router"
import { ArrowLeft } from "lucide-react-native"
import { Text, View } from "react-native"
import { Palette } from "../styles/palette"
import { XXL, XXS } from "../styles/size"
import { Inter, Typography } from "../styles/typography"

type HeaderProps = {
    title: string
}

export function Header({ title }: HeaderProps) {
    const router = useRouter()
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                height: XXL
            }}
        >
            <ArrowLeft
                onPress={() => router.back()}
                hitSlop={{ top: XXS, right: XXS, bottom: XXS, left: XXS }}
                style={{ position: "absolute", left: 0 }}
                stroke={Palette.gray[600]}
            />
            <Text style={[Typography.body, { fontFamily: Inter.medium }]}>{title}</Text>
        </View>
    )
}
