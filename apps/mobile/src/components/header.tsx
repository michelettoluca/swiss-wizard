import { useRouter } from "expo-router"
import { ArrowLeft, icons } from "lucide-react-native"
import { Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Palette } from "../styles/palette"
import { Size } from "../styles/size"
import { Inter, Typography } from "../styles/typography"
import { Icon } from "./Icon"

type HeaderProps = {
    title: string
    action?: {
        icon: keyof typeof icons
        onPress: () => void
    }
    backgroundColor?: string
    color?: string
}

export function Header({ title, backgroundColor, color, action }: HeaderProps) {
    const { top } = useSafeAreaInsets()
    const router = useRouter()

    return (
        <View
            style={{
                paddingHorizontal: Size.XS,
                paddingTop: Size.L + top,
                paddingBottom: Size.L,
                alignItems: "center",
                backgroundColor
            }}
        >
            <ArrowLeft
                onPress={() => router.back()}
                hitSlop={{ top: Size.XXS, right: Size.XXS, bottom: Size.XXS, left: Size.XXS }}
                style={{ position: "absolute", left: Size.L, bottom: Size.M }}
                stroke={color ?? Palette.gray[900]}
            />
            <Text style={[Typography.body, { fontFamily: Inter.medium, color: color ?? Palette.gray[900] }]}>
                {title}
            </Text>
            {action && (
                <Icon
                    name={action.icon}
                    onPress={() => action.onPress()}
                    hitSlop={{ top: Size.XXS, right: Size.XXS, bottom: Size.XXS, left: Size.XXS }}
                    style={{ position: "absolute", right: Size.L, bottom: Size.M }}
                    stroke={color ?? Palette.gray[900]}
                />
            )}
        </View>
    )
}
