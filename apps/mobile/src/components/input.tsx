import React, { useEffect, useRef } from "react"
import { Keyboard, Pressable, PressableProps, StyleSheet, Text, TextInput, TextInputProps, View } from "react-native"
import { Palette } from "../styles/palette"
import { Size } from "../styles/size"
import { Typography } from "../styles/typography"

type InputProps = {
    label: string
    placeholder?: string
    value: string
    onChange: (value: string) => void
    style?: PressableProps["style"]
    suffix?: string
    keyboardType?: TextInputProps["keyboardType"]
}

export function Input({ label, placeholder, value, onChange, suffix, keyboardType, style }: InputProps) {
    const inputRef = useRef<TextInput>(null)

    useEffect(() => {
        const listener = Keyboard.addListener("keyboardDidHide", () => blur())

        return () => listener.remove()
    }, [])

    function blur() {
        const { current: ref } = inputRef

        if (!ref) {
            return
        }

        ref.blur()
    }

    function focus() {
        const { current: ref } = inputRef

        if (!ref) {
            return
        }

        ref.focus()
    }

    return (
        <Pressable
            style={StyleSheet.flatten([
                {
                    flexDirection: "column",
                    justifyContent: "center",
                    backgroundColor: Palette.white,
                    borderRadius: Size.XS,
                    paddingHorizontal: Size.M,
                    height: Size.XXXL,
                    gap: Size.XXXS
                },
                style
            ])}
            onPress={focus}
        >
            <Text style={Typography.label}>{label}</Text>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: Size.XXXS
                }}
            >
                <TextInput
                    ref={inputRef}
                    style={{ color: Palette.gray[900], padding: 0, height: Size.M }}
                    placeholder={placeholder ?? ""}
                    placeholderTextColor={Palette.gray[400]}
                    cursorColor={Palette.gray[600]}
                    value={value}
                    onChangeText={onChange}
                    keyboardType={keyboardType}
                />
                <Text style={[Typography.body, { color: Palette.gray[400] }]}>{suffix}</Text>
            </View>
        </Pressable>
    )
}
