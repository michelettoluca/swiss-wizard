import { useRouter } from "expo-router"
import { ArrowLeft, Settings } from "lucide-react-native"
import { Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Palette } from "../styles/palette"
import { Size } from "../styles/size"
import { Inter, Typography } from "../styles/typography"

type HeaderProps = {
    title: string
}

export function Header({ title }: HeaderProps) {
    const { top } = useSafeAreaInsets()
    const router = useRouter()
    return (
        <View
            style={{
                zIndex: 20,
                paddingHorizontal: Size.XS,
                paddingTop: Size.L + top,
                paddingBottom: Size.L,
                alignItems: "center",
                backgroundColor: Palette.blue[100]
            }}
        >
            <ArrowLeft
                onPress={() => router.back()}
                hitSlop={{ top: Size.XXS, right: Size.XXS, bottom: Size.XXS, left: Size.XXS }}
                style={{ position: "absolute", left: Size.L, bottom: Size.M }}
                stroke={Palette.blue[900]}
            />
            <Text style={[Typography.body, { fontFamily: Inter.medium, color: Palette.blue[900] }]}>{title}</Text>
            <Settings
                hitSlop={{ top: Size.XXS, right: Size.XXS, bottom: Size.XXS, left: Size.XXS }}
                style={{ position: "absolute", right: Size.L, bottom: Size.M }}
                stroke={Palette.blue[900]}
            />
        </View>
    )
}
