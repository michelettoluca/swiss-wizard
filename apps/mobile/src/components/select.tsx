import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import { ChevronsUpDown } from "lucide-react-native"
import { Fragment, useRef } from "react"
import { Keyboard, Pressable, PressableProps, StyleSheet, Text, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"
import { Palette } from "../styles/palette"
import { Size } from "../styles/size"
import { Inter, Typography } from "../styles/typography"
import { Separator } from "./separator"

type SelectProps<T> = {
    label: string
    placeholder: string
    suffix?: string
    value: T
    onChange: (value: T) => void
    options: Option<T>[]
    style?: PressableProps["style"]
}

type Option<T> = {
    label: string
    value: T
}

export function Select<T>({ label, placeholder, suffix, value, onChange, options, style }: SelectProps<T>) {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null)

    const selected = options.find((option) => JSON.stringify(option.value) === JSON.stringify(value))
    const selectedIndex = selected ? options.indexOf(selected) : null

    function handlePresentModalPress() {
        Keyboard.dismiss()
        bottomSheetModalRef.current?.present()
    }
    function closeModal() {
        bottomSheetModalRef.current?.close({ duration: 150 })
    }

    return (
        <>
            <Pressable
                style={StyleSheet.flatten([
                    {
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: Palette.white,
                        borderRadius: Size.XS,
                        paddingHorizontal: Size.M,
                        height: Size.XXXL,
                        gap: Size.XXXS
                    },
                    style
                ])}
                onPress={handlePresentModalPress}
            >
                <View
                    style={{
                        flexDirection: "column",
                        justifyContent: "center"
                    }}
                >
                    <Text style={Typography.label}>{label}</Text>
                    <Text style={[Typography.body, { color: selected ? Palette.gray[900] : Palette.gray[400] }]}>
                        {selected?.label ?? placeholder}{" "}
                        {selected && suffix && <Text style={{ color: Palette.gray[400] }}>{suffix}</Text>}
                    </Text>
                </View>

                <ChevronsUpDown size={Size.M} stroke={Palette.gray[400]} />
            </Pressable>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                backdropComponent={() => (
                    <Animated.View
                        entering={FadeIn.duration(150)}
                        exiting={FadeOut.duration(150)}
                        style={[
                            StyleSheet.absoluteFillObject,
                            {
                                backgroundColor: "rgba(0, 0, 0, 0.25)"
                            }
                        ]}
                    >
                        <Pressable style={{ flex: 1 }} onPress={closeModal} />
                    </Animated.View>
                )}
                snapPoints={["50%"]}
                containerStyle={{
                    borderRadius: 0
                }}
                style={{
                    borderRadius: 0
                }}
            >
                <BottomSheetView
                    style={{
                        flex: 1
                    }}
                >
                    <Text
                        style={{
                            fontFamily: Inter.medium,
                            fontSize: Size.BASE,
                            textAlign: "center",
                            color: Palette.gray[900],
                            paddingVertical: Size.BASE,
                            borderBottomColor: Palette.gray[100],
                            borderBottomWidth: 1
                        }}
                    >
                        {label}
                    </Text>
                    <ScrollView>
                        {options.map((option, i) => (
                            <Fragment key={JSON.stringify(option.value)}>
                                <Pressable
                                    style={{
                                        height: Size.XXXL,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: selectedIndex === i ? Palette.gray[100] : undefined
                                    }}
                                    onPress={() => {
                                        closeModal()
                                        onChange(option.value)
                                    }}
                                >
                                    <Text style={Typography.body}>{option.label}</Text>
                                </Pressable>
                                <Separator color={Palette.gray[100]} />
                            </Fragment>
                        ))}
                    </ScrollView>
                </BottomSheetView>
            </BottomSheetModal>
        </>
    )
}
