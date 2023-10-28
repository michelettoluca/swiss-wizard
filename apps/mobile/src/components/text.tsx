import tw from "twrnc"
import { Text as NativeText, StyleSheet } from "react-native"
import { font } from "../constants/fonts"

type StyledTextProps = {} & React.ComponentProps<typeof NativeText>

export function Text({ style, children, ...props }: StyledTextProps) {
	return (
		<NativeText
			style={[tw`text-zinc-300`, font["Geist Regular"], style]}
			{...props}>
			{children}
		</NativeText>
	)
}
