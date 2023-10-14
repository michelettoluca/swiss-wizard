import tw from "twrnc"
import { Text as NativeText, StyleSheet } from "react-native"

export const fw = {
	regular: { fontFamily: "Inter Regular" },
	medium: { fontFamily: "Inter Medium" },
	semibold: { fontFamily: "Inter SemiBold" },
	bold: { fontFamily: "Inter Bold" },
} as const

type StyledTextProps = {} & React.ComponentProps<typeof NativeText>

export function Text({ style, children, ...props }: StyledTextProps) {
	let fontFamily

	let s = StyleSheet.compose(
		{
			fontFamily,
		},
		style || StyleSheet.create({})
	)

	s = StyleSheet.compose(tw`text-slate-600 text-sm`, s)

	return (
		<NativeText style={s} {...props}>
			{children}
		</NativeText>
	)
}
