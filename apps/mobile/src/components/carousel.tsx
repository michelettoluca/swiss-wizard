import { ChevronLeft, ChevronRight } from "lucide-react-native"
import { Children, useEffect, useRef, useState } from "react"
import { Pressable, PressableProps, StyleSheet, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils"
import { Palette } from "../styles/palette"
import { Size } from "../styles/size"

type CarouselProps = {
    offset: number
} & ViewProps

export function Carousel({ style, children, offset }: CarouselProps) {
    const scrollViewRef = useRef<ScrollView>(null)
    const [pageIndex, setPageIndex] = useState<number>(0)

    useEffect(() => {
        scrollViewRef.current?.scrollTo({ x: offset * pageIndex })
    }, [pageIndex])

    const childrenCount = Children.count(children)

    return (
        <View
            style={StyleSheet.flatten([
                style,
                {
                    borderRadius: Size.XXS,
                    overflow: "hidden"
                }
            ])}
        >
            {pageIndex > 0 && (
                <NavButton
                    style={{
                        left: Size.XXS
                    }}
                    onPress={() => setPageIndex(Math.max(pageIndex - 1, 0))}
                >
                    <ChevronLeft size={Size.M} stroke={Palette.gray[500]} />
                </NavButton>
            )}
            {pageIndex < childrenCount - 1 && (
                <NavButton
                    style={{
                        right: Size.XXS
                    }}
                    onPress={() => setPageIndex(Math.min(pageIndex + 1, childrenCount - 1))}
                >
                    <ChevronRight size={Size.M} stroke={Palette.gray[500]} />
                </NavButton>
            )}
            <View
                style={{
                    position: "absolute",
                    flexDirection: "row",
                    bottom: Size.XXS,
                    gap: Size.XXS,
                    left: "50%",
                    transform: [{ translateX: -childrenCount * Size.XXS }],
                    borderBlockColor: "red",
                    zIndex: 10
                }}
            >
                {Children.map(children, (_, i) => (
                    <View
                        style={{
                            height: Size.XXS,
                            width: Size.XXS,
                            borderRadius: Size.XXS,
                            backgroundColor: Palette.white,
                            opacity: i === pageIndex ? 1 : 0.3
                        }}
                    />
                ))}
            </View>
            <ScrollView
                ref={scrollViewRef}
                scrollEnabled={false}
                horizontal
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled={false}
            >
                {children}
            </ScrollView>
        </View>
    )
}

function NavButton({ style, ...props }: PressableProps) {
    return (
        <Pressable
            style={StyleSheet.flatten([
                {
                    position: "absolute",
                    top: "50%",
                    transform: [
                        {
                            translateY: -Size.BASE
                        }
                    ],
                    height: Size.XL,
                    width: Size.XL,
                    backgroundColor: Palette.white,
                    borderRadius: Size.XL,
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                    opacity: 0.7
                },
                style
            ])}
            {...props}
        />
    )
}
