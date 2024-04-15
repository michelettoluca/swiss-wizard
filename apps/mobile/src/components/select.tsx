import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import { Fragment, useRef } from "react"
import { Keyboard, Pressable, StyleSheet } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"
import { GRAY, WHITE } from "../styles/color"
import { BASE, M, XS, XXXL, XXXS } from "../styles/size"
import { Separator } from "./separator"
import { Text } from "./text"

type SelectProps<T> = {
    label: string
    placeholder: string
    value: T
    onChange: (value: T) => void
    options: Option<T>[]
}

type Option<T> = {
    label: string
    value: T
}

export function Select<T>({ label, placeholder, value, onChange, options }: SelectProps<T>) {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null)

    const selected = options.find((option) => JSON.stringify(option.value) === JSON.stringify(value))
    const selectedIndex = selected ? options.indexOf(selected) : null

    function handlePresentModalPress() {
        Keyboard.dismiss()
        bottomSheetModalRef.current?.present()
    }
    function closeModal() {
        bottomSheetModalRef.current?.close({ duration: 75 })
    }

    return (
        <>
            <Pressable
                style={StyleSheet.flatten([
                    {
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        backgroundColor: WHITE,
                        borderRadius: XS,
                        paddingHorizontal: M,
                        height: XXXL,
                        gap: XXXS
                    }
                ])}
                onPress={handlePresentModalPress}
            >
                <Text size={XS} color={GRAY[600]}>
                    {label}
                </Text>
                <Text color={selected ? GRAY[900] : GRAY[400]}>{selected?.label ?? placeholder}</Text>
            </Pressable>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                backdropComponent={() => (
                    <Animated.View
                        entering={FadeIn.duration(75)}
                        exiting={FadeOut.duration(75)}
                        style={{
                            ...StyleSheet.absoluteFillObject,
                            backgroundColor: "rgba(0, 0, 0, 0.25)"
                        }}
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
                        align="center"
                        color={GRAY[900]}
                        weight="medium"
                        size={BASE}
                        style={{ paddingVertical: BASE, borderBottomColor: GRAY[100], borderBottomWidth: 1 }}
                    >
                        {label}
                    </Text>
                    <ScrollView>
                        {options.map((option, i) => (
                            <Fragment key={JSON.stringify(option.value)}>
                                <Pressable
                                    style={{
                                        height: XXXL,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: selectedIndex === i ? GRAY[100] : undefined
                                    }}
                                    onPress={() => {
                                        closeModal()
                                        onChange(option.value)
                                    }}
                                >
                                    <Text>{option.label}</Text>
                                </Pressable>
                                <Separator color={GRAY[100]} />
                            </Fragment>
                        ))}
                    </ScrollView>
                </BottomSheetView>
            </BottomSheetModal>
        </>
    )
}
