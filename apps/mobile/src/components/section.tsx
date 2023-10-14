import { View } from "react-native"
import { fw, Text } from "./text"
import tw from "twrnc"

type SectionProps = {
	icon: React.ReactNode
	title: string
} & React.PropsWithChildren

export function Section({ icon, title, children }: SectionProps) {
	return (
		<View>
			<View style={tw`flex flex-col gap-2 px-6`}>
				<View style={tw`flex flex-row items-center gap-2`}>
					{icon}
					<Text style={[tw`text-slate-500`, fw.semibold]}>{title}</Text>
				</View>
				<Text style={[tw`text-xl`, fw.semibold]}>{title}</Text>
			</View>
			<>{children}</>
		</View>
	)
}
