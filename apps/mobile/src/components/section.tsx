import { View } from "react-native"
import { Text } from "./text"
import tw from "twrnc"
import { font } from "../constants/fonts"

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
					<Text style={[tw`text-zinc-500`, font["Geist SemiBold"]]}>
						{title}
					</Text>
				</View>
				<Text style={[tw`text-xl`, font["Geist SemiBold"]]}>{title}</Text>
			</View>
			<>{children}</>
		</View>
	)
}
