import { View, Pressable } from "react-native"
import { Text } from "../components/text"
import tw from "twrnc"
import { font } from "../constants/fonts"
import {
	BoxIcon,
	Chrome,
	CircleDashed,
	Database,
	DiscIcon,
	Speech,
} from "lucide-react-native"
import { Box } from "../components/box"
import { useModal } from "../components/modal"

type SignInProps = {}

export function SignIn({}: SignInProps) {
	const modal = useModal()

	return (
		<View style={tw`flex-1 flex justify-center items-center px-6`}>
			<View>
				<Text
					style={[
						tw`text-3xl text-center text-zinc-100`,
						font["Geist UltraBlack"],
					]}>
					Swiss Wizard
				</Text>
				<Text style={tw`text-center text-zinc-300`}>
					Swiss Wizard™ is a app organize swiss style tournaments.{" "}
				</Text>
			</View>
			<View style={tw`flex gap-3 w-full mt-20`}>
				<Pressable
					style={tw`flex-row gap-2 items-center px-6 py-3 justify-center w-full rounded-full border border-zinc-600`}>
					<Chrome size={20} style={tw`text-zinc-100`} />
					<Text>Continue with Google</Text>
				</Pressable>
				<Pressable
					style={tw`flex-row gap-2 items-center px-6 py-3 justify-center w-full rounded-full border border-zinc-600`}>
					<Speech size={20} style={tw`text-zinc-100`} />
					<Text>Continue with X</Text>
				</Pressable>
				<Pressable
					style={tw`flex-row gap-2 items-center px-6 py-3 justify-center w-full rounded-full border border-zinc-600`}
					onPress={() =>
						modal.open(
							<View style={tw`p-6`}>
								<Text style={tw`text-zinc-600`}>
									C:\Users\Luca\Desktop\ci
									provo\swiss-wizard\node_modules\@babel\parser\lib\index.js:6827:17
								</Text>
							</View>
						)
					}>
					<BoxIcon size={20} style={tw`text-zinc-100`} />
					<Text>Continue with Discord</Text>
				</Pressable>
			</View>
		</View>
	)
}
