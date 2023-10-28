import { useFonts } from "expo-font"
import { SafeAreaView, StatusBar } from "react-native"
import tw from "twrnc"
import { ModalProvider } from "./components/modal"
import { SignIn } from "./screens/sign-in"
import { Tournament } from "./screens/tournament"
import { FONTS } from "./constants/fonts"

export default function App() {
	let [fontsLoaded, fontError] = useFonts(FONTS)

	if (!fontsLoaded && !fontError) {
		return null
	}

	return (
		<SafeAreaView
			style={[tw`flex-1 bg-zinc-800`, { paddingTop: StatusBar.currentHeight }]}>
			<ModalProvider>
				{/* <Tournament /> */}
				<SignIn />
			</ModalProvider>
		</SafeAreaView>
	)
}
