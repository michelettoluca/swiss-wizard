import { useRouter } from "expo-router"
import { ArrowLeft, icons } from "lucide-react-native"
import { Text, Animated } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Palette } from "../styles/palette"
import { Size } from "../styles/size"
import { Inter, Typography } from "../styles/typography"
import { Icon } from "./Icon"

type HeaderProps = {
    title: string
    translateY: Animated.AnimatedInterpolation<number>
    action?: {
        icon: keyof typeof icons
        onPress: () => void
    }
    backgroundColor?: string
    color?: string
}

export function useHeader() {
    const { top } = useSafeAreaInsets()
    const scrollY = new Animated.Value(0)
    const diffClamp = Animated.diffClamp<number>(scrollY, 0, 64 + top)

    const translateY = diffClamp.interpolate({
        inputRange: [0, 64 + top],
        outputRange: [0, -64 - top]
    })

    return { translateY, scrollY, setScroll: (value: number) => scrollY.setValue(value) } as const
}

export function Header({ title, backgroundColor, translateY, color, action }: HeaderProps) {
    const { top } = useSafeAreaInsets()
    const router = useRouter()
    const height = 64 + top

    return (
        <Animated.View
            style={{
                backgroundColor,
                height: height,
                paddingTop: top,
                transform: [{ translateY }],
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: 0,
                right: 0,
                left: 0,
                zIndex: 1
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
        </Animated.View>
    )
}
