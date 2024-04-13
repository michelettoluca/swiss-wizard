import { useRef } from "react"
import { Pressable, PressableProps, StyleSheet, TextInput } from "react-native"
import { GRAY, WHITE } from "../styles/color"
import { M, XS, XXXL } from "../styles/size"
import { Text } from "./text"

type InputProps = {
    label: string
    placeholder?: string
    value: string
    onChange: (value: string) => void
    style?: PressableProps["style"]
}

export function Input({ label, placeholder, value, onChange, style }: InputProps) {
    const inputRef = useRef<TextInput>(null)

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
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    backgroundColor: WHITE,
                    borderRadius: XS,
                    paddingHorizontal: M,
                    height: XXXL,
                    flex: 1
                },
                style
            ])}
            onPress={focus}
        >
            <Text size={XS} color={GRAY[600]}>
                {label}
            </Text>
            <TextInput
                ref={inputRef}
                style={{ color: GRAY[900] }}
                placeholder={placeholder ?? ""}
                placeholderTextColor={GRAY[400]}
                cursorColor={GRAY[600]}
                value={value}
                onChangeText={onChange}
            />
        </Pressable>
    )
}
