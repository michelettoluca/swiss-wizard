import { View, Pressable } from "react-native"
import { Text } from "../components/text"
import tw from "twrnc"
import { font } from "../constants/fonts"
import Google from "../../assets/svgs/google.svg"
import X from "../../assets/svgs/x.svg"
import Discord from "../../assets/svgs/discord.svg"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../App"

type SignInProps = NativeStackScreenProps<RootStackParamList, "sign-in">

export function SignIn({ navigation }: SignInProps) {
	return (
		<View style={tw`flex-1 flex justify-center items-center px-6`}>
			<View>
				<Text
					style={[
						tw`text-3xl text-center text-zinc-800`,
						font["Geist UltraBlack"],
					]}>
					Swiss Wizard
				</Text>
				<Text style={tw`text-center text-zinc-600`}>
					Swiss Wizard™ is a app organize swiss style tournaments.{" "}
				</Text>
			</View>
			<View style={tw`flex gap-3 w-full mt-20`}>
				<Pressable
					style={tw`flex-row gap-2 items-center px-6 py-3 justify-center w-full rounded-full border border-zinc-200`}>
					<Google />
					<Text>Continue with Google</Text>
				</Pressable>
				<Pressable
					style={tw`flex-row gap-2 items-center px-6 py-3 justify-center w-full rounded-full border border-zinc-200`}>
					<X />
					<Text>Continue with X</Text>
				</Pressable>
				<Pressable
					style={tw`flex-row gap-2 items-center px-6 py-3 justify-center w-full rounded-full border border-zinc-200`}
					onPress={() => navigation.navigate("tournament")}>
					<Discord />
					<Text>Continue with Discord</Text>
				</Pressable>
			</View>
		</View>
	)
}
