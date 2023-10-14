import { View } from "react-native"
import tw from "twrnc"

type BoxProps = {} & React.PropsWithChildren & React.ComponentProps<typeof View>

export function Box({ style, children, ...props }: BoxProps) {
	return (
		<View style={[tw`p-6`, style]} {...props}>
			{children}
		</View>
	)
}
