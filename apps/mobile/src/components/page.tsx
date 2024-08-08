import { useRouter } from "expo-router"
import { ArrowLeft, icons } from "lucide-react-native"
import { Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Palette } from "../styles/palette"
import { Size } from "../styles/size"
import { Inter, Typography } from "../styles/typography"
import { Icon } from "./Icon"
import { PropsWithChildren } from "react"
import Animated, {
    clamp,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue
} from "react-native-reanimated"

const HEADER_HEIGHT = 64

type PageProps = {
    title: string
    action?: {
        icon: keyof typeof icons
        onPress: () => void
    }
    backgroundColor: string
    color?: string
} & PropsWithChildren

function useHeader(backgroundColor: string) {
    const { top } = useSafeAreaInsets()
    const delta = useSharedValue(0)
    const offset = useSharedValue(0)

    const max = HEADER_HEIGHT + top

    const scrollHandler = useAnimatedScrollHandler<{ scrollStart: number }>({
        onBeginDrag: (event, context) => {
            context.scrollStart = event.contentOffset.y
        },
        onScroll: (event, context) => {
            delta.value = clamp(delta.value + event.contentOffset.y - context.scrollStart, 0, max)
            offset.value = event.contentOffset.y

            context.scrollStart = event.contentOffset.y
        }
    })

    const style = useAnimatedStyle(() => ({
        backgroundColor: backgroundColor + "e6",
        transform: [
            {
                translateY: interpolate(delta.value, [0, max], [0, -max])
            }
        ]
    }))

    return {
        style,
        scrollHandler
    }
}

export function Page({ title, backgroundColor, color, action, children }: PageProps) {
    const { top } = useSafeAreaInsets()
    const router = useRouter()
    const { style, scrollHandler } = useHeader(backgroundColor)

    return (
        <>
            <Animated.View
                style={[
                    {
                        height: HEADER_HEIGHT + top,
                        paddingTop: top,
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        top: 0,
                        right: 0,
                        left: 0,
                        zIndex: 1
                    },
                    style
                ]}
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

            <Animated.ScrollView showsVerticalScrollIndicator={false} onScroll={scrollHandler} overScrollMode={"never"}>
                <View style={{ height: HEADER_HEIGHT + top, backgroundColor }} />
                {children}
            </Animated.ScrollView>
        </>
    )
}
